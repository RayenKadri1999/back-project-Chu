import mongoose from 'mongoose';

const { Schema } = mongoose;

/**
 * Helper function that recursively removes keys with empty string, null, or undefined values.
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

const sequenceperfusionSchema = new Schema(
    {
        matricule: {
            type: String,
            ref: 'Hospitalisation',
            required: true,
        },
        status: {
            type: String,
            enum: ['Oui', 'Non'],
            required: true,
            default: 'Non',
        },
        Details: {
            type: [String],
            default: undefined,
        },
    },
    { timestamps: true }
);

// Pre-save middleware to enforce business rules and remove empty fields.
sequenceperfusionSchema.pre('save', function (next) {
    // When status is "Non", clear the Details array.
    if (this.status === 'Non') {
        this.Details = undefined;
    }
    // Clean up any empty keys in the document.
    removeEmpty(this._doc);
    next();
});

const SequencePerfusion = mongoose.model('SequencePerfusion', sequenceperfusionSchema);

export default SequencePerfusion;
