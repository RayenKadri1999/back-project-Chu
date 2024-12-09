import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const sequenceperfusionSchema = new mongoose.Schema({
  

   
 matricule: {
    type: String,
    ref: 'Hospitalisation',
    required: true,
  },

  




    status:{
      type: String,
      required: true,
    },
    Details:{
      type: Array,
      required: true,
    },

  
});

export default mongoose.model('SequencePerfusion', sequenceperfusionSchema);
