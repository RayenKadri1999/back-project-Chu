import mongoose from "mongoose";
const Schema = mongoose.Schema;
const dossierMedicalSchema = new Schema({
    
      prehospitaliere: {
        type: Schema.Types.ObjectId,
        ref: 'Prehospitaliere',
      },


      ///données cliniques
      hospitaliere: {
        type: Schema.Types.ObjectId,
        ref: 'Hospitaliere',
      },
      initial: {
        type: Schema.Types.ObjectId,
        ref: 'Initial',
      },
      nihss: {
        type: Schema.Types.ObjectId,
        ref: 'NIHSS',
      },//
      
      imagerie: {
        type: Schema.Types.ObjectId,
        ref: 'Imagerie',
      },
     
      examenComplementaire: {
        type: Schema.Types.ObjectId,
        ref: 'ExamenComplementaire',
      },
      conclusionSortie: {
        type: Schema.Types.ObjectId,
        ref: 'ConclusionSortie',
      },
    });
  
  export default mongoose.model('DossierMedical', dossierMedicalSchema);
  