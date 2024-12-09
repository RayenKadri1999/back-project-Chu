import mongoose from "mongoose";
const Schema = mongoose.Schema;
const conclusioninitialeSchema = new Schema({
  


    
   


Hémoglobine :  {
    type: Number,
    required: true,
  },

Plaquettes:{
  type: Number,
  required: true,
},
INR :{
    type: Number,
    required: true,
  },
  ECG :  {
    type: Number,
    required: true,
  },
TP :  {
  type: Number,
  required: true,
},


Ratio_TCA : {
    type: Number,
    
    required: true,
  },

  Dosage : {
  type: Number,
  required: true,
},

 Conclusion:{
    type:String,

 },
  matricule: {
    type: String,
    ref: 'Hospitalisation',
    required: true,
  },


  });
  
  export default mongoose.model('ConclusionInitiale', conclusioninitialeSchema);
  