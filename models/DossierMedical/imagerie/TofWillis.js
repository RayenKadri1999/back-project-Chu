import mongoose from 'mongoose';

const { Schema } = mongoose;

/**
 * Recursively remove keys with empty string, null, or undefined values
 * from an object. This helps in keeping the MongoDB document lean.
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

const tofwillisSchema = new Schema(
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
        // Fields used when status is "Anormal"
        occlusion: {
            type: String,
            default: undefined,
        },
        Stenose: {
            type: String,
            default: undefined,
        },
        StenosePercent: {
            type: String,
            default: undefined,
        },
        M1G: {
            type: String,
            default: undefined,
        },
        M1D: {
            type: String,
            default: undefined,
        },
        Details: {
            type: [String],
            default: undefined,
        },
    },
    { timestamps: true }
);

// Pre-save middleware to enforce business logic and remove empty fields.
tofwillisSchema.pre('save', function (next) {
    // When status is "Normal", clear all related fields.
    if (this.status === 'Normal') {
        this.occlusion = undefined;
        this.Stenose = undefined;
        this.StenosePercent = undefined;
        this.M1G = undefined;
        this.M1D = undefined;
        this.Details = undefined;
    }
    // Remove any keys with empty, null, or undefined values.
    removeEmpty(this._doc);
    next();
});

const TofWillis = mongoose.model('TofWillis', tofwillisSchema);

export default TofWillis;
