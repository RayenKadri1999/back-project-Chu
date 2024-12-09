import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const recommandationSchema = new mongoose.Schema({
    text: { type: String, required: true }, // Texte principal de la recommandation
    ajustementTherapeutique: { type: String, required: false }, // Ajustement thérapeutique
    examensComplementaires: { type: String, required: false }, // Examens complémentaires
});

const conclusionSortieHematomeSchema = new mongoose.Schema({
    // NIHSS sortie
    NIHSSValue: { type: Number, required: true },

    idNIHSS: {
        type: Schema.Types.ObjectId,
        ref: 'NIHSS',
        required: true,
    },

    // mRS sortie
    mRsSortie: { type: Number, required: true },

    // LAST sortie
    LastSortie: { type: Number, required: true },

    // Mode sortie
    ModeSortie: { type: String, required: true },

    // Traitement de sortie
    TraitementSortie: { type: [String], required: true },

    // Recommandations de sortie
    RecommandationsSortie: {
        type: [recommandationSchema], // Utilisation du sous-schéma
        required: true,
    },

    Conclusion: {
        type: String,
        required: true,
    },

    matricule: {
        type: String,
        ref: 'Hospitalisation',
        required: true,
    },
});

export default mongoose.model('ConclusionSortieHematome', conclusionSortieHematomeSchema);
