import mongoose from 'mongoose';

const { Schema } = mongoose;

const examenCliniqueHematomeSchema = new Schema({
    NIHSSValue: { type: Number, default: null },
    idNIHSS: { type: mongoose.Schema.Types.ObjectId, ref: 'Nihss', default: null }, // Store the reference to the Nihss document
    LASTInitial: { type: Number, default: null },
    Temperature: { type: String, default: null }, // Could be Number, depending on format
    ScoreGlasgow: { type: Number, default: null },
    ResultExamenNeuroInitial: { type: String, default: null },
    TA: { type: String, default: null },
    Dextro: { type: String, default: null },
    AuscultationCardiaque: { type: String, default: null },
    AuscultationPulmonaire: { type: String, default: null },
    SouffleCarotidien: { type: String, enum: ['Oui', 'Non'], default: null },
    ResultsExamenGeneral: { type: String, default: null },
    testDeglutition: {
        testDone: { type: Boolean, default: null },
        hasTrouble: { type: Boolean, default: null },
        typeOfTrouble: { type: String, enum: ['Aux liquides', 'Aux solides', 'Globale'], default: null },
    },
    Description: { type: String, default: null },
    matricule: { type: String, ref: "Hospitalisation", required: true },
    dossier: { type: mongoose.Schema.Types.ObjectId, ref: "Dossier" },
    dossierMedical: { type: mongoose.Schema.Types.ObjectId, ref: "DossierMedical" }
}, {
    timestamps: true
});

// Pre-save middleware to clean data
examenCliniqueHematomeSchema.pre('save', function (next) {
    const cleanedData = {};
    Object.keys(this._doc).forEach((key) => {
        if (this[key] !== undefined && this[key] !== null && this[key] !== '') { //Keep booleans, numbers and strings.
            cleanedData[key] = this[key];
        }
    });
    this._doc = cleanedData;
    next();
});

const ExamenCliniqueHematome = mongoose.model('ExamenCliniqueHematome', examenCliniqueHematomeSchema);

export default ExamenCliniqueHematome;