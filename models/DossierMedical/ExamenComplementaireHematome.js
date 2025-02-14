import mongoose from 'mongoose';

const { Schema } = mongoose;

const examensComplementairesHematomeSchema = new Schema({
    ETT: { type: Boolean, default: false },
    DescETT: { type: String, default: null }, // Use null instead of ''
    ETO: { type: Boolean, default: false },
    DescETO: { type: String, default: null }, // Use null instead of ''
    Arteriographie: { type: Boolean, default: false },
    DescArteriographie: { type: String, default: null }, // Corrected field name
    AutreExamens: { type: Boolean, default: false },
    DescAutreExamens: { type: String, default: null }, // Use null instead of ''
    matricule: { type: String, ref: "Hospitalisation", required: true },
    dossier: { type: mongoose.Schema.Types.ObjectId, ref: "Dossier" },
    dossierMedical: { type: mongoose.Schema.Types.ObjectId, ref: "DossierMedical" }
}, {
    timestamps: true
});

// Pre-save middleware to clean data
examensComplementairesHematomeSchema.pre('save', function (next) {
    const cleanedData = {};
    Object.keys(this._doc).forEach((key) => {
        if (this[key] !== undefined && this[key] !== null && this[key] !== '') { // Removed Boolean check
            cleanedData[key] = this[key];
        }
    });
    this._doc = cleanedData;
    next();
});

const ExamensComplementairesHematome = mongoose.model('ExamensComplementairesHematome', examensComplementairesHematomeSchema);

export default ExamensComplementairesHematome;