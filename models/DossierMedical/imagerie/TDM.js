import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const tdmSchema = new Schema({
    status: { type: String, required: true }, // "Oui" or "Non"
    dateTDM: { type: Date, required: false },
    description: { type: String, required: false },
    volumeHematomeEquation: { type: String, required: false },
    localisationSusTentoriel: { type: String, enum: ["profond", "lobaire"], required: false },
    localisationSousTentoriel: { type: String, enum: ["profond", "lobaire"], required: false },
    deviationLigneMediane: { type: String, required: false },
    engagement: { type: String, enum: ["Oui", "Non"], required: false },
    hydrocephalie: { type: String, enum: ["Oui", "Non"], required: false },
    hemorragieMeningeeAssociee: { type: String, enum: ["Oui", "Non"], required: false },
    hemorragieIntraventriculaire: { type: String, enum: ["Oui", "Non"], required: false },
    angioTDM: { type: String, enum: ["Oui", "Non"], required: false },
    tumeurCerebrale: { type: String, enum: ["Oui", "Non"], required: false },
    presenceMAV: { type: String, enum: ["Oui", "Non"], required: false },
    presenceAnevrisme: { type: String, enum: ["Oui", "Non"], required: false },
    spotSign: { type: String, enum: ["Oui", "Non"], required: false },
    tdmAutres: { type: String, required: false },
    matricule: {
        type: String,
        ref: 'Hospitalisation',
        required: true,
    },// Patient/Record ID
}, { timestamps: true });

export default mongoose.model('TDM', tdmSchema);
