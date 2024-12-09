import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const fatsatSchema = new mongoose.Schema({
  

   
 matricule: {
    type: String,
    ref: 'Hospitalisation',
    required: true,
  },

  


    status:{
      type: String,
      required: true,
    },
    AnomalieGauche:{
      type: String,
    
    },
    AnomalieDroite:{
      type: String,
     
    },
   



  
});

export default mongoose.model('FatSat', fatsatSchema);
