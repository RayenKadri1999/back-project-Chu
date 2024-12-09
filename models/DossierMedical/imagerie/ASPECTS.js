import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const aspectsSchema = new mongoose.Schema({
  

   
 matricule: {
    type: String,
    ref: 'Hospitalisation',
    required: true,
  },

  



    AspectsNumber:{
      type: Number,
      required: true,
    },
    AspectsDetails:{ type: Array, required: true },

  
});

export default mongoose.model('ASPECTS', aspectsSchema);
