import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const conclusionSortieSchema = new mongoose.Schema({
  // NIHSS sortie
  NIHSSValue: { type: Number, required: true },//table
  idNIHSS:{
    type: Schema.Types.ObjectId,
    ref: 'NIHSS',
    required: true,
  },
  
  // mRS sortie
  mRsSortie: { type: Number, required: true },

  // LAST sortie
  LastSortie: { type: Number, required: true },

  // Mode sortie
  ModeSortie: { type: String, required: true },

  // Traitement de sortie
  TraitementSortie: { type: Array, required: true },

  // Recommandations de sortie
  RecommandationsSortie: {
    type: Array, 
    required: true,
    // enum: ["ajustementTherapeutique", "examensComplementaires"],
    
  },

  Conclusion :{
    type: String, required: true
  },
  matricule: {
    type: String,
    ref: 'Hospitalisation',
    required: true,
  },
});

export default mongoose.model('ConclusionSortie', conclusionSortieSchema);
