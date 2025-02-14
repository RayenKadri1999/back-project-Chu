import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const conclusionSortieSchema = new mongoose.Schema({
  // NIHSS sortie
  NIHSSValue: { type: Number, default:null,required: false },//table
  idNIHSS:{
    type: Schema.Types.ObjectId,
    ref: 'NIHSS',
    required:function () {
      return this.NIHSSValue !== null;}
  },
  
  // mRS sortie
  mRsSortie: { type: Number, default : null},

  // LAST sortie
  LastSortie: { type: Number,default : null },

  // Mode sortie
  ModeSortie: { type: String,default : null },

  // Traitement de sortie
  TraitementSortie: { type: Array, default : null },

  // Recommandations de sortie
  RecommandationsSortie: {
    type: Array,
    default : null,
    // enum: ["ajustementTherapeutique", "examensComplementaires"],
    
  },

  Conclusion :{
    type: String, default : null
  },
  matricule: {
    type: String,
    ref: 'Hospitalisation',
    required: true,
  },
  dossier: { type: mongoose.Schema.Types.ObjectId, ref: "Dossier" },
  dossierMedical: { type: mongoose.Schema.Types.ObjectId, ref: "DossierMedical" }
},{timestamps:true,minimize:true});
conclusionSortieSchema.pre('save', function (next) {
  const cleanedData = {};
  Object.keys(this._doc).forEach((key) => {
    if (this[key] !== null && this[key] !== undefined && this[key] !== '') {
      cleanedData[key] = this[key];
    }
  });
  this._doc = cleanedData;
  next();
});
export default mongoose.model('ConclusionSortie', conclusionSortieSchema);
