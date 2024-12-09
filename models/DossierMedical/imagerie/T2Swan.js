import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const t2SwanSchema = new mongoose.Schema({
  

 matricule: {
    type: String,
    ref: 'Hospitalisation',
    required: true,
  },

    status:{
      type: String,
      required: true,
    },
    Profonds:{
      type: Number,
   
    },
    Sous_corticaux:{
      type: Number,
     
    },
    Total:{
      type: Number,
 
    },
    Thrombusvisible:{
      type: String,

    },
    ThrombusvisibleTaille:{
      type: Number,
    
    },
    Hémosidérosecorticale:{
      type: String,
     
    },
    Signes_veineux_hypoxie:{
      type: String,
   
    },
    Microbleeds:{
      type: Array,
     
    },
  




  
});

export default mongoose.model('T2Swan', t2SwanSchema);
