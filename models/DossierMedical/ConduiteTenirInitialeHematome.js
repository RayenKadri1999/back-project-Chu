import mongoose from 'mongoose';

const { Schema } = mongoose;

const ConduiteTenirInitialeHematomeSchema = new Schema({
    thrombolyseIntraveineuse: { type: String, enum: ['Oui', 'Non',null], default: null },
    BasseTA: { type: String, enum: ['Oui', 'Non',null], default: null },
    BasseTADelai: { type: Number, default: null },
    BasseTAtypeTraitement: { type: String, default: null },
    VoieAdministration: { type: String, enum: ['Voie veineuse', 'Voie orale',null], default: null },
    ReversionINR: { type: String, enum: ['Oui', 'Non',null], default: null },
    INRinitial: { type: String, default: null }, // Can be a Number as well, depends on expected format
    PPSB: { type: String, enum: ['Oui', 'Non',null], default: null },
    posologie: { type: String, default: null },
    VITK: { type: String, enum: ['Oui', 'Non',null], default: null },
    INRcontroleValeur: { type: String, default: null }, // Can be a Number, depends on expected format
    INRcontroleHeure: { type: Date, default: null }, // Store as Date object
    TestDeglutition: { type: String, enum: ['Oui', 'Non',null], default: null },
    PriseEnChargeChirurgicale: { type: String, enum: ['Oui', 'Non',null], default: null },
    InsulinotherapieEnSC: { type: String, enum: ['Oui', 'Non',null], default: null },
    TraitementParVoieOraleType: { type: String, default: null },
    InsulinotherapieEnSCHeure: { type: Date, default: null }, // Store as Date object
    Hypolipemiants: { type: String, enum: ['Oui', 'Non',null], default: null },
    Atorvastatine: { type: String, enum: ['Oui', 'Non',null], default: null },
    AtorvastatineDose: { type: Number, default: null },
    Ezetimib: { type: String, enum: ['Oui', 'Non',null], default: null },
    PCSK9: { type: String, enum: ['Oui', 'Non',null], default: null },
    MatelasAntiEscarre: { type: String, enum: ['Oui', 'Non',null], default: null },
    MatelasAntiEscarreHeure: { type: Date, default: null }, // Store as Date object
    ReeducationOrthophonique: { type: String, enum: ['Oui', 'Non',null], default: null },
    ReeducationOrthophoniqueHeure: { type: Date, default: null }, // Store as Date object
    Verticalisation: { type: String, enum: ['Oui', 'Non',null], default: null },
    VerticalisationHeure: { type: Date, default: null }, // Store as Date object
    SondeNasogastrique: { type: String, enum: ['Oui', 'Non',null], default: null },
    SondeNasogastriqueHeure: { type: Date, default: null }, // Store as Date object
    ReeducationMotrice: { type: String, enum: ['Oui', 'Non',null], default: null },
    ReeducationMotriceHeure: { type: Date, default: null },
    Hydratationparenterale: { type: String, enum: ['Oui', 'Non',null], default: null },
    AnticoagulationPreventive: { type: String, enum: ['Oui', 'Non',null], default: null },
    TraitementAntipyretique: { type: String, enum: ['Oui', 'Non',null], default: null },
    BasContention: { type: String, enum: ['Oui', 'Non',null], default: null },

    dossier: { type: mongoose.Schema.Types.ObjectId, ref: "Dossier" },
    dossierMedical: { type: mongoose.Schema.Types.ObjectId, ref: "DossierMedical" }

}, {
    timestamps: true
});

// Pre-save middleware to clean data
ConduiteTenirInitialeHematomeSchema.pre('save', function (next) {
    const cleanedData = {};
    Object.keys(this._doc).forEach((key) => {
        if (this[key] !== undefined && this[key] !== null && this[key] !== '') {
            cleanedData[key] = this[key];
        }
    });
    this._doc = cleanedData;
    next();
});

const ConduiteTenirInitialeHematome = mongoose.model('ConduiteTenirInitialeHematome', ConduiteTenirInitialeHematomeSchema);

export default ConduiteTenirInitialeHematome;