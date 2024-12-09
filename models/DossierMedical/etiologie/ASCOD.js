import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const ascodSchema = new mongoose.Schema({
  

   
 matricule: {
    type: String,
    ref: 'Hospitalisation',
    required: true,
  },
    A:{
      type: Number,
      required: true,
    },
    S:{
      type: Number,
      required: true,
    },
    C:{
      type: Number,
      required: true,
    },
    O:{
      type: Number,
      required: true,
    },
    D:{
      type: Number,
      required: true,
    },
   
   info:{
    type: String,
    required: true,
  },
  
   


});

export default mongoose.model('ASCOD', ascodSchema);
