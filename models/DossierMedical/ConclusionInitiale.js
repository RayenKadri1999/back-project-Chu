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
    minimize: true,
  });
conclusioninitialeSchema.pre('save', function (next) {
    const cleanedData = {};
    Object.keys(this._doc).forEach((key) => {
        if (this[key] !== null && this[key] !== undefined && this[key] !== '') {
            cleanedData[key] = this[key];
        }
    });
    this._doc = cleanedData;
    next();
});

  export default mongoose.model('ConclusionInitiale', conclusioninitialeSchema);
  