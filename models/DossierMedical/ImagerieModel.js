import mongoose from 'mongoose';

const { Schema } = mongoose;



const imagerieSchema = new Schema(
    {
        Synthèse: {
            type: String,
            default: undefined,
        },
        Synthèseflair: {
            type: String,

            default: undefined,
        },
        SynthèsetofWillis: {
            type: String,
            default: undefined,
        },
        Synthèset2Swan: {
            type: String,
            default: undefined,
        },
        SynthèseASL: {
            type: String,
            default: undefined,
        },
        SynthèseDWI: {
            type: String,
            default: undefined,
        },
        matricule: {
            type: String,
            ref: 'Hospitalisation',
            required: true,
        },
        dossier: { type: mongoose.Schema.Types.ObjectId, ref: "Dossier" },
        dossierMedical: { type: mongoose.Schema.Types.ObjectId, ref: "DossierMedical" }
    },
    { timestamps: true }
);

// Pre-save middleware to remove any keys with empty, null, or undefined values.
imagerieSchema.pre('save', function (next) {
    const cleanedData = {};
    Object.keys(this._doc).forEach((key) => {
        if (this[key] !== null && this[key] !== undefined && this[key] !== '') {
            cleanedData[key] = this[key];
        }
    });
    this._doc = cleanedData;
    next();
});

export default mongoose.model('Imagerie', imagerieSchema);
