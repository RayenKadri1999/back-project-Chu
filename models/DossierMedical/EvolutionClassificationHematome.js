import mongoose from 'mongoose';

const { Schema } = mongoose;

const evolutionClassificationHematomeSchema = new Schema({
    PlanClinique: { type: Boolean, default: false },
    PlanEtiologique: { type: Boolean, default: false },
    PlanThérapeutique: { type: Boolean, default: false },
    DescPlanClinique: { type: String, default: null },
    DescPlanEtiologique: { type: String, default: null },
    DescPlanThérapeutique: { type: String, default: null },
    PneumopathieInhalation: { type: String, enum: ['Oui', 'Non'], default: null },
    InfectionUrinaire: { type: String, enum: ['Oui', 'Non'], default: null },
    EmboliePulmonaire: { type: String, enum: ['Oui', 'Non'], default: null },
    ThromboseVeineuseProfonde: { type: String, enum: ['Oui', 'Non'], default: null },
    HemorragieExtracranienne: { type: String, enum: ['Oui', 'Non'], default: null },
    Escarre: { type: String, enum: ['Oui', 'Non'], default: null },
    matricule: { type: String, ref: "Hospitalisation", required: true },
    dossier: { type: mongoose.Schema.Types.ObjectId, ref: "Dossier" },
    dossierMedical: { type: mongoose.Schema.Types.ObjectId, ref: "DossierMedical" }
}, {
    timestamps: true
});

// Pre-save middleware to clean data
evolutionClassificationHematomeSchema.pre('save', function (next) {
    const cleanedData = {};
    Object.keys(this._doc).forEach((key) => {
        if (this[key] !== undefined && this[key] !== null && this[key] !== '') {
            cleanedData[key] = this[key];
        }
    });
    this._doc = cleanedData;
    next();
});

const EvolutionClassificationHematome = mongoose.model('EvolutionClassificationHematome', evolutionClassificationHematomeSchema);

export default EvolutionClassificationHematome;