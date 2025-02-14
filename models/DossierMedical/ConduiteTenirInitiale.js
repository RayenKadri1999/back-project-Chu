import mongoose from 'mongoose';

const { Schema } = mongoose;

const conduitetenirinitialeSchema = new Schema(
    {
        // Pharmacologique
        thrombolyseIntraveineuse: { type: String, enum: ["Oui", , "Non",null], default: null },
        doorToNeedle: { type: Date, default: null },
        doorToNeedleDetails: { type: String, default: null },
        actilyse: { type: String, enum: ["Oui", , "Non",null], default: null },
        tenecteplase: { type: String, enum: ["Oui", , "Non",null], default: null },
        delayExceeded: { type: String, enum: ["Oui", , "Non",null], default: null },
        recentHypodensity: { type: String, enum: ["Oui", , "Non",null], default: null },
        otherCauses: { type: String, default: null },
        anticoagulationTherapy: { type: String, enum: ["Oui", , "Non",null], default: null },
        motorRehabilitation: { type: String, enum: ["Oui", , "Non",null], default: null },
        rehabilitationTime: { type: Date, default: null },
        plaquettes: { type: String, enum: ["Oui", , "Non",null], default: null },
        INR: { type: String, enum: ["Oui", , "Non",null], default: null },
        AnticoagulationCurative: { type: String, enum: ["Oui", , "Non",null], default: null },
        AITSansOcclusion: { type: String, enum: ["Oui", , "Non",null], default: null },
        DeficitMineurSansOcclusion: { type: String, enum: ["Oui", , "Non",null], default: null },
        ChirurgieRecente: { type: String, enum: ["Oui", , "Non",null], default: null },
        HemorragieRecente: { type: String, enum: ["Oui", , "Non",null], default: null },
        AnticoagulationCurativeII: { type: String, enum: ["Oui", , "Non",null], default: null },
        ThrombectomieMecanique: { type: String, enum: ["Oui", , "Non",null], default: null },
        ThrombectomieMecaniqueHeure: { type: Date, default: null },
        StentRetriever: { type: String, enum: ["Oui", , "Non",null], default: null },
        ThromboAspiration: { type: String, enum: ["Oui", , "Non",null], default: null },
        TICI: { type: String, default: null }, // Consider using Number type and validation if TICI should be numeric
        HNF: { type: String, enum: ["Oui", , "Non",null], default: null },
        HBPM: { type: String, enum: ["Oui", , "Non",null], default: null },
        AOD: { type: String, enum: ["Oui", , "Non",null], default: null },
        DelaiIntro: { type: Date, default: null },
        SimpleAntiAgregationPlaquettaire: { type: String, enum: ["Oui", , "Non",null], default: null },
        SimpleAntiAgregationPlaquettaireType: {
            type: String,
            enum: ["Aspegic", "Clopidogrel", "Ticagrelor",null],
            default: null
        },
        DoubleAntiAgregationPlaquettaire: { type: String, enum: ["Oui", , "Non",null], default: null },
        DoubleAntiAgregationPlaquettaireDose: { type: String, enum: ["Oui", , "Non",null], default: null },
        DoubleAntiAgregationPlaquettaireDoseHeure: { type: Date, default: null },
        DoubleAntiAgregationPlaquettaireType: {
            type: String,
            enum: ["Clopidogrel", "Ticagrelor",null],
            default: null
        },
        AnticoagulationCurativeIIHeure: { type: Date, default: null },
        TraitementAntihypertenseur: { type: String, enum: ["Oui", , "Non",null], default: null },
        TraitementParVoieIntraveineuse: { type: String, enum: ["Oui", , "Non",null], default: null },
        TraitementParVoieIntraveineuseHeure: { type: Date, default: null },
        Nicardipine: { type: String, enum: ["Oui", , "Non",null], default: null },
        TraitementParVoieIntraveineuseAutresMolecules: { type: String, default: null },
        TraitementParVoieOrale: { type: String, enum: ["Oui", , "Non",null], default: null },
        TraitementParVoieOraleHeure: { type: Date, default: null },
        InsulinotherapieEnSC: { type: String, enum: ["Oui", , "Non",null], default: null },
        TraitementParVoieOraleType: { type: String, default: null }, // Consider enum if there are limited valid types
        InsulinotherapieEnSCHeure: { type: Date, default: null },
        Hypolipemiants: { type: String, enum: ["Oui", , "Non",null], default: null },
        Atorvastatine: { type: String, enum: ["Oui", , "Non",null], default: null },
        AtorvastatineDose: { type: Number, default: 0 }, // Default value important if Atorvastatine is 'Oui' and dose is required
        Ezetimib: { type: String, enum: ["Oui", , "Non",null], default: null },
        PCSK9: { type: String, enum: ["Oui", , "Non",null], default: null },

        // Non Pharmacologique
        MatelasAntiEscarre: { type: String, enum: ["Oui", "Non",null], default: null },
        MatelasAntiEscarreHeure: { type: Date, default: null },
        ReeducationOrthophonique: { type: String, enum: ["Oui", , "Non",null], default: null },
        ReeducationOrthophoniqueHeure: { type: Date, default: null },
        Verticalisation: { type: String, enum: ["Oui", , "Non",null], default: null },
        VerticalisationHeure: { type: Date, default: null },
        SondeNasogastrique: { type: String, enum: ["Oui", , "Non",null], default: null },
        SondeNasogastriqueHeure: { type: Date, default: null },
        ReeducationMotrice: { type: String, enum: ["Oui", , "Non",null], default: null },
        ReeducationMotriceHeure: { type: Date, default: null },

        //  Other Fields
        matricule: {
            type: String,
            ref: "Hospitalisation",
            required: true
        }
    },
    { timestamps: true } // Automatically add createdAt and updatedAt fields
);

// Pre-save middleware to clean data
conduitetenirinitialeSchema.pre('save', function (next) {
    const cleanedData = {};
    Object.keys(this._doc).forEach((key) => {
        if (this[key] !== null && this[key] !== undefined && this[key] !== '') {
            cleanedData[key] = this[key];
        }
    });
    this._doc = cleanedData;
    next();
});

const ConduiteTenirInitiale = mongoose.model(
    "ConduiteTenirInitiale",
    conduitetenirinitialeSchema
);

export default ConduiteTenirInitiale;