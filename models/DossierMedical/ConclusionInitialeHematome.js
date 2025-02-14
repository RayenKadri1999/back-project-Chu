import mongoose from 'mongoose';

const { Schema } = mongoose;

const conclusionInitialeHematomeSchema = new Schema({
    ECG: { type: String, default: null },
    TP: { type: Number, default: null },
    Ratio_TCA: { type: Number, default: null },
    Urée_Créat: { type: Number, default: null },
    INR: { type: Number, default: null },
    Plaquettes: { type: Number, default: null },
    Hémoglobine: { type: Number, default: null },
    Dosage: { type: String, default: null },
    ActivitéAntiXa: { type: Number, default: null },
    matricule: { type: String, ref: "Hospitalisation", required: true },
    Conclusion: { type: String, default: null }
    ,
    dossier: { type: mongoose.Schema.Types.ObjectId, ref: "Dossier" },
    dossierMedical: { type: mongoose.Schema.Types.ObjectId, ref: "DossierMedical" }
}, {
    timestamps: true
});

// Pre-save middleware to clean data
conclusionInitialeHematomeSchema.pre('save', function (next) {
    const cleanedData = {};
    Object.keys(this._doc).forEach((key) => {
        if (this[key] !== undefined && this[key] !== null && this[key] !== '') {
            cleanedData[key] = this[key];
        }
    });
    this._doc = cleanedData;
    next();
});

const ConclusionInitialeHematome = mongoose.model('ConclusionInitialeHematome', conclusionInitialeHematomeSchema);

export default ConclusionInitialeHematome;