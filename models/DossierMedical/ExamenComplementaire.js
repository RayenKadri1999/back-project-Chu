import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const examenComplementaireSchema = new mongoose.Schema({

  TélémétrieCardiaque:{ type: Boolean, required: true },
    DescTélémétrieCardiaque:{ type: String },

    
    ETT: { type: Boolean, required: true },
    DescETT:{ type: String },
   
    ETO : { type: Boolean, required: true },
    DescETO:{ type: String },



  Arteriographie : { type: Boolean, required: true },
    DescArteriographie:{ type: String },
  // Télémétrie cardiaque


  HolterRythmique : { type: Boolean, required: true },
    DescHolterRythmique : { type: String },
        
    EDTSATC : { type: Boolean, required: true },
    DescEDTSATC : { type: String },

    AutreExamens : { type: Boolean, required: true },
    DescAutreExamens : { type: String },
  
  matricule: {
    type: String,
    ref: 'Hospitalisation',
    required: true,
  },
});

export default mongoose.model('ExamenComplementaire', examenComplementaireSchema);
