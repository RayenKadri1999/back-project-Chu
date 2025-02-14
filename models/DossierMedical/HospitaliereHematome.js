import mongoose from 'mongoose';

const { Schema } = mongoose;

const hospitaliereHematomeSchema = new Schema({
    Allergies: { type: String, enum: ['Oui', 'Non'], default: null },
    HTA: { type: String, enum: ['Oui', 'Non'], default: null },
    Hypercholestérolémie: { type: String, enum: ['Oui', 'Non'], default: null },
    Diabète: { type: String, enum: ['Oui', 'Non'], default: null },
    Fibrillation_auriculaire: { type: String, enum: ['paroxystique', 'permanente'], default: null },
    Ancienneté_fibrillation: { type: String, enum: ['Oui', 'Non'], default: null },
    SAS: { type: String, enum: ['Oui', 'Non'], default: null },
    SAS_appareillé: { type: String, enum: ['Oui', 'Non'], default: null },
    AIT: { type: String, enum: ['Oui', 'Non'], default: null },
    AVC: { type: String, enum: ['ischémique', 'hémorragique'], default: null },
    Cardiopathie_ischémique: { type: String, enum: ['Oui', 'Non'], default: null },
    Artériopathie: { type: String, enum: ['Oui', 'Non'], default: null },
    Autres_antécédents: { type: String, default: null },
    Vit: { type: String, enum: ['seul', 'en famille', 'en institution', 'Autre'], default: null },
    Latéralité: { type: String, enum: ['Droite', 'Gauche'], default: null },
    Profession: { type: String, default: null },
    Autonomie: { type: String, default: null },
    Tabagisme: { type: String, enum: ['Oui', 'Non'], default: null },
    Chicha: { type: String, enum: ['Oui', 'Non'], default: null },
    Neffa: { type: String, enum: ['Oui', 'Non'], default: null },
    Consommation_alcool: { type: String, enum: ['Oui', 'Non'], default: null },
    Rankin_préAVC: { type: Number, min: 0, max: 6, default: null },
    GIR: { type: Number, min: 0, max: 6, default: null },
    Poids: { type: Number, default: null },
    Taille: { type: Number, default: null },
    IMC: { type: Number, default: null },
    HistoireMaladie: { type: String, default: null },
    TraitementEntrée: { type: String, default: null },
    matricule: { type: String, ref: "Hospitalisation", required: true },
    patient: { type: String, ref: "Patient", required: true },
    dossier: { type: mongoose.Schema.Types.ObjectId, ref: "Dossier" },
    dossierMedical: { type: mongoose.Schema.Types.ObjectId, ref: "DossierMedical" }
}, {
    timestamps: true
});

// Pre-save middleware to clean data
hospitaliereHematomeSchema.pre('save', function (next) {
    const cleanedData = {};
    Object.keys(this._doc).forEach((key) => {
        if (this[key] !== undefined && this[key] !== '') {  //Allow zero values for numbers
            cleanedData[key] = this[key];
        }
    });
    this._doc = cleanedData;
    next();
});

const HospitaliereHematome = mongoose.model('HospitaliereHematome', hospitaliereHematomeSchema);

export default HospitaliereHematome;