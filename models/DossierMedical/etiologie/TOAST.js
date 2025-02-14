import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const toastSchema = new mongoose.Schema({
  

   
 matricule: {
    type: String,
    ref: 'Hospitalisation',
    required: true,
  },

  dossier: { type: mongoose.Schema.Types.ObjectId, ref: "Dossier" },
  dossierMedical: { type: mongoose.Schema.Types.ObjectId, ref: "DossierMedical" },
  atherothrombotique: { type: String, enum: ['oui', 'non'], default: null},
  atherothrombotiqueContent: { type: [String], default: null },
  info: { type: String, default: '' },
  cardioembolique: { type: String, enum: ['oui', 'non'], default: null },
  cardioemboliqueContent: { type: [String], default:null },
  fibrillation_valvulaire: { type: String, default: null },
  fibrillation_type: { type: String, default:null},
  fibrillation_anticoagulee: { type: String, default: null },
  lacune: { type: String, enum: ['oui', 'non'], default: null },
  Indetermine: { type: String, enum: ['oui', 'non'], default: null },
  IndetermineContent: { type: String, default: null }


},{timestamps: true,minimize:true });
toastSchema.pre('save', function (next) {
  const cleanedData = {};
  Object.keys(this._doc).forEach((key) => {
    if (this[key] !== null && this[key] !== undefined && this[key] !== '') {
      cleanedData[key] = this[key];
    }
  });
  this._doc = cleanedData;
  next();
});


export default mongoose.model('TOAST', toastSchema);
