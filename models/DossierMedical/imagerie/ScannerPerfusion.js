import mongoose from 'mongoose';

const { Schema } = mongoose;

/**
 * Helper function to recursively remove keys with empty string, null, or undefined values.
 */

const scannerPerfusionSchema = new Schema(
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
        DateScanner: {
            type: Date,
            default: undefined,
        },
        dossier: { type: mongoose.Schema.Types.ObjectId, ref: "Dossier" },
        dossierMedical: { type: mongoose.Schema.Types.ObjectId, ref: "DossierMedical" }
    },
    { timestamps: true }
);

// Pre-save middleware to enforce business rules and cleanup.
scannerPerfusionSchema.pre('save', function (next) {
    const cleanedData = {};
    Object.keys(this._doc).forEach((key) => {
        if (this[key] !== null && this[key] !== undefined && this[key] !== '') {
            cleanedData[key] = this[key];
        }
    });
    this._doc = cleanedData;
    next();
});
const ScannerPerfusion = mongoose.model('ScannerPerfusion', scannerPerfusionSchema);

export default ScannerPerfusion;
