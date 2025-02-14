import mongoose from 'mongoose';

const { Schema } = mongoose;

const conclusionSortieHematomeSchema = new Schema({
    NIHSSValue: { type: Number, default: null },
    mRsSortie: { type: Number, default: null },
    idNIHSS: { type: mongoose.Schema.Types.ObjectId, ref: 'Nihss', default: null },
    LastSortie: { type: Number, default: null },
    ModeSortie: { type: String, enum: ['A domicile', 'Transfert dans un autre service', 'Décés'], default: null },
    TraitementSortie: [{ type: String, default: null }], // Array of strings
    RecommandationsSortie: [{ // Array of objects
        text: { type: String, default: null },
        ajustementTherapeutique: { type: String, default: null },
        examensComplementaires: { type: String, enum: ['MAPA', 'Autres'], default: null }
    }],
    Conclusion: { type: String, default: null },
    matricule: { type: String, ref: "Hospitalisation", required: true },
    dossier: { type: mongoose.Schema.Types.ObjectId, ref: "Dossier" },
    dossierMedical: { type: mongoose.Schema.Types.ObjectId, ref: "DossierMedical" }
}, {
    timestamps: true
});

// Pre-save middleware to clean data
conclusionSortieHematomeSchema.pre('save', function (next) {
    const cleanedData = {};
    Object.keys(this._doc).forEach((key) => {
        if (this[key] !== undefined && this[key] !== null && this[key] !== '') {
            cleanedData[key] = this[key];
        }
    });
    this._doc = cleanedData;
    next();
});

const ConclusionSortieHematome = mongoose.model('ConclusionSortieHematome', conclusionSortieHematomeSchema);

export default ConclusionSortieHematome;