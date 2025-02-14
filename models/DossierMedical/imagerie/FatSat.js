import mongoose from 'mongoose';

const { Schema } = mongoose;

/**
 * Helper function that recursively removes keys with empty string, null,
 * or undefined values from an object.
 */
function removeEmpty(obj) {
    if (typeof obj !== 'object' || obj === null) return obj;
    Object.keys(obj).forEach((key) => {
        const value = obj[key];
        if (typeof value === 'object' && value !== null) {
            removeEmpty(value);
            if (Object.keys(value).length === 0) {
                delete obj[key];
            }
        } else if (value === '' || value === null || value === undefined) {
            delete obj[key];
        }
    });
    return obj;
}

const fatsatSchema = new Schema(
    {
        matricule: {
            type: String,
            ref: 'Hospitalisation',
            required: true,
        },
        status: {
            type: String,
            enum: ['Normal', 'Anormal'],
            required: true,
            default: 'Normal',
        },
        AnomalieGauche: {
            type: String,
            default: undefined,
        },
        AnomalieDroite: {
            type: String,
            default: undefined,
        },
    },
    { timestamps: true }
);

// Pre-save middleware to enforce business rules and cleanup.
fatsatSchema.pre('save', function (next) {
    const cleanedData = {};
    Object.keys(this._doc).forEach((key) => {
        if (this[key] !== null && this[key] !== undefined && this[key] !== '') {
            cleanedData[key] = this[key];
        }
    });
    this._doc = cleanedData;
    next();
});

const FatSat = mongoose.model('FatSat', fatsatSchema);

export default FatSat;
