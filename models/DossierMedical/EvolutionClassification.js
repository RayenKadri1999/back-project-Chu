import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const evolutionClassificationSchema = new mongoose.Schema({

  DescPlanClinique: { type: String, required: true },
  
  DescPlanEtiologique: { type: String, required: true },
  
  DescPlanThérapeutique : { type: String, required: true },


  PlanClinique: { type: Boolean },
  
  PlanEtiologique: { type: Boolean },
  
  PlanThérapeutique : { type: Boolean },
  
 

  
  matricule: {
    type: String,
    ref: 'Hospitalisation',
    required: true,
  },
});

export default mongoose.model('EvolutionClassification', evolutionClassificationSchema);
