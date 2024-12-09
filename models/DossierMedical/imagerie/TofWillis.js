import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const tofwillisSchema = new mongoose.Schema({
  


 matricule: {
    type: String,
    ref: 'Hospitalisation',
    required: true,
  },
    status:{
      type: String,
      required: true,
    },

    occlusion:{
      type: String,
      
    },
   
    M1G:{
      type: String,
      
    },
    M1D:{
      type: String,
   
    },
    Details:{
      type: Array,
   
    },
    

  
});

export default mongoose.model('TofWillis', tofwillisSchema);
