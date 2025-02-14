import mongoose from 'mongoose';

const { Schema } = mongoose;

/**
 * Helper function to recursively remove keys with empty, null, or undefined values.
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

const tsaSchema = new Schema(
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

// Pre-save middleware to enforce business rules.
tsaSchema.pre('save', function (next) {
    // When status is "Non", clear out anomaly details.
    if (this.status === 'Non') {
        this.AnomalieGauche = undefined;
        this.AnomalieDroite = undefined;
    }
    // Remove any empty keys from the document.
    removeEmpty(this._doc);
    next();
});

const TSA = mongoose.model('TSA', tsaSchema);

export default TSA;
