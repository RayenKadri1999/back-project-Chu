import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const toastSchema = new mongoose.Schema({
  

   
 matricule: {
    type: String,
    ref: 'Hospitalisation',
    required: true,
  },
  athérothrombotique:{
    type: String,
    enum:["oui","non"],
    required: true,
  },
    athérothrombotiqueContent:{ type: Array, required: true },
    
    info:{
      type: String,
     
    },
    cardioemboliqueContent:{ type: Array, required: true },
    cardioembolique:{
      type: String,
      enum:["oui","non"],
      required: true,
    },

    fibrillation_valvulaire:{
      type: String,
    
    },
    fibrillation_type:{
      type: String,
      
    },
    fibrillation_anticoagulée:{
      type: String,
     
    },
    lacune:{
      type: String,
      enum:["oui","non"],
      required: true,
    },
    IndeterminéContent:{type: String},
    
    Indeterminé:{
      type: String,
      enum:["oui","non"],
      required: true,
    },


});

export default mongoose.model('TOAST', toastSchema);
