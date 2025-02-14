import mongoose from 'mongoose';

const { Schema } = mongoose;

// Helper function that recursively removes keys with empty values.
function removeEmpty(obj) {
    if (typeof obj !== 'object' || obj === null) return obj;
    Object.keys(obj).forEach((key) => {
        const value = obj[key];
        if (typeof value === 'object' && value !== null) {
            removeEmpty(value);
            if (Object.keys(value).length === 0) {
                delete obj[key];
            }
        } else if (value === '' || value === null || value === undefined) {
            delete obj[key];
        }
    });
    return obj;
}

const scannerSchema = new Schema(
    {
        matricule: {
            type: String,
            ref: 'Hospitalisation',
            required: true,
        },
        status: {
            type: String,
            enum: ['Oui', 'Non'],
            required: true,
            default: 'Non',
        },
        DateScanner: {
            type: Date,
            default: undefined,
        },
        AngioscanTSA_Willis: {
            type: String,
            // Expected values: "Normal", "Anormal"
            default: undefined,
        },
        Occlusin: {
            type: String,
            default: undefined,
        },
        Stenose: {
            type: String,
            default: undefined,
        },
        StenosePercent: {
            type: String,
            // Expected values: ">50%", "<50%"
            default: undefined,
        },
        Description: {
            type: String,
            default: undefined,
        },
        Score: {
            type: Number,
            enum: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
            required: true,
            default: undefined,
        },
        ACGauche: {
            type: String,
            default: undefined,
        },
        ACDroite: {
            type: String,
            default: undefined,
        },
        troncbasilaire: {
            type: String,
            // Expected "oui" or "non"
            default: 'non',
        },
        AVGauche: {
            type: String,
            default: undefined,
        },
        AVDroite: {
            type: String,
            default: undefined,
        },
        AngioWillisGauche: {
            type: String,
            default: undefined,
        },
        AngioWillisDroite: {
            type: String,
            default: undefined,
        },
        AngioTSAGauche: {
            type: String,
            default: undefined,
        },
        AngioTSADroite: {
            type: String,
            default: undefined,
        },
    },
    { timestamps: true }
);

scannerSchema.pre('save', function (next) {
    // If status is "Non", clear out all fields except matricule and status.
    if (this.status === 'Non') {
        this.DateScanner = undefined;
        this.AngioscanTSA_Willis = undefined;
        this.Occlusin = undefined;
        this.Stenose = undefined;
        this.StenosePercent = undefined;
        this.Description = undefined;
        this.Score = undefined;
        this.ACGauche = undefined;
        this.ACDroite = undefined;
        this.troncbasilaire = 'non';
        this.AVGauche = undefined;
        this.AVDroite = undefined;
        this.AngioWillisGauche = undefined;
        this.AngioWillisDroite = undefined;
        this.AngioTSAGauche = undefined;
        this.AngioTSADroite = undefined;
    } else {
        // If AngioscanTSA_Willis is "Normal", clear occlusion/stenosis and related fields.
        if (this.AngioscanTSA_Willis === 'Normal') {
            this.Occlusin = undefined;
            this.ACGauche = undefined;
            this.ACDroite = undefined;
            this.troncbasilaire = 'non';
            this.AVGauche = undefined;
            this.AVDroite = undefined;
            this.AngioTSAGauche = undefined;
            this.AngioTSADroite = undefined;
        }
        // If Stenose is not "Oui", then clear the StenosePercent field.
        if (this.Stenose !== 'Oui') {
            this.StenosePercent = undefined;
        }
    }

    // Remove any empty keys from the document
    removeEmpty(this._doc);
    next();
});

const Scanner = mongoose.model('Scanner', scannerSchema);

export default Scanner;
