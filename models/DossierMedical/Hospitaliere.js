import mongoose from 'mongoose';

const { Schema } = mongoose;

// Define the schema
const hospitaliereSchema = new Schema(
    {
        Allergies: { type: String, default: null },
        HTA: { type: String, default: null },
        Hypercholestérolémie: { type: String, default: null },
        Diabète: { type: String, default: null },
        Fibrillation_auriculaire: { type: String, default: null },
        Ancienneté_fibrillation: { type: String, default: null },
        SAS: { type: String, default: null },
        SAS_appareillé: { type: String, default: null },
        AIT: { type: String, default: null },
        AVC: { type: String, default: null },
        Cardiopathie_ischémique: { type: String, default: null },
        Artériopathie: { type: String, default: null },
        Autres_antécédents: { type: String, default: null },
        Vit: { type: String, default: null },
        Latéralité: { type: String, default: null },
        Profession: { type: String, default: null },
        Autonomie: { type: String, default: null },
        Tabagisme: { type: String, default: null },
        Chicha: { type: String, default: null },
        Neffa: { type: String, default: null },
        Consommation_alcool: { type: String, default: null },
        Rankin_préAVC: { type: Number, default: null },
        GIR: { type: Number, default: null },
        Poids: { type: Number, default: null },
        Taille: { type: Number, default: null },
        IMC: { type: Number, default: null },
        HistoireMaladie: { type: String, default: null },
        TraitementEntrée: { type: String, default: null },
        matricule: { type: String, ref: "Hospitalisation", required: true },
        dossier: { type: mongoose.Schema.Types.ObjectId, ref: "Dossier" },
        dossierMedical: { type: mongoose.Schema.Types.ObjectId, ref: "DossierMedical" }
    },
    { timestamps: true } // Automatically add createdAt and updatedAt fields
);

// Pre-save middleware to clean data
hospitaliereSchema.pre('save', function (next) {
    const cleanedData = {};
    Object.keys(this._doc).forEach((key) => {
        if (this[key] !== null && this[key] !== undefined && this[key] !== '') {
            cleanedData[key] = this[key];
        }
    });
    this._doc = cleanedData;
    next();
});

// Create and export the model
const Hospitaliere = mongoose.model('Hospitaliere', hospitaliereSchema);
export default Hospitaliere;