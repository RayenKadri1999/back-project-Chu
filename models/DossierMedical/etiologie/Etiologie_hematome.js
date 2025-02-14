import mongoose from 'mongoose';

const { Schema } = mongoose;

// Define the schema
const etiologieHematomeSchema = new Schema(
    {
        Microangiopathie: { type: String, enum: ['oui', 'non',null], default: null},
        AngiopathieAmyloide: { type: String, enum: ['oui', 'non',null], default: null},
        MalformationArterioveineuse: { type: String, enum: ['oui', 'non',null], default: null},
        AnevrysmeRompu: { type: String, enum: ['oui', 'non',null], default: null},
        CoagulopathieIatrogene: { type: String, enum: ['oui', 'non',null], default: null},
        CoagulopathieConstitutionnelle: { type: String, enum: ['oui', 'non',null], default: null},
        TransformationHemorragique: { type: String, enum: ['oui', 'non',null], default: null},
        ThromboseVeineuseCerebrale: { type: String, enum: ['oui', 'non',null], default: null},
        Autres: { type: String, enum: ['oui', 'non',null], default: null},
        AVC: { type: String, enum: ['oui', 'non',null], default: null},
        Indeterminee: { type: String, enum: ['oui', 'non',null], default: null},
        TumeurCerebrale: { type: String, enum: ['oui', 'non',null], default: null},
        info: { type: String, default: null},

        matricule: { type: String, ref: "Hospitalisation", required: true },
        dossier: { type: mongoose.Schema.Types.ObjectId, ref: "Dossier" },
        dossierMedical: { type: mongoose.Schema.Types.ObjectId, ref: "DossierMedical" }
    },
    { timestamps: true } // Automatically add createdAt and updatedAt fields
);

// Pre-save middleware to clean data
etiologieHematomeSchema.pre('save', function (next) {
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
const EtiologieHematome = mongoose.model('EtiologieHematome', etiologieHematomeSchema);
export default EtiologieHematome;