import mongoose from "mongoose";
const Schema = mongoose.Schema;
const conclusioninitialeSchema = new Schema({





    ECG: {
        type: Number,
        default: null, // Allows null or can be left unset
    },
    TP: {
        type: Number,
        default: null,
    },
    Ratio_TCA: {
        type: Number,
        default: null,
    },
    INR: {
        type: Number,
        default: null,
    },
    Plaquettes: {
        type: Number,
        default: null,
    },
    Hémoglobine: {
        type: Number,
        default: null,
    },
    Dosage: {
        type: Number,
        default: null,
    },
    Conclusion: {
        type: String,
        default: null,
    },
    matricule: {
    type: String,
    ref: 'Hospitalisation',
    required: true,
  },
    },
{
    timestamps: true, // Adds createdAt and updatedAt fields

  });
  
  export default mongoose.model('ConclusionInitiale', conclusioninitialeSchema);
  