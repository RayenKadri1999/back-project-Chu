import mongoose from "mongoose";
const Schema = mongoose.Schema;
const conduitetenirinitialeSchema = new Schema({
  


    
   


 DoubleAntiAgrégationPlaquettaire:{
  type:Boolean,
  required:true,

},

    Clopidogrel:{
      type:String,
      enum : ["Oui", "Non","ND"],
     
   },
  
    ticagrelor:{
      type:String,
      enum : ["Oui", "Non","ND"],
      
   },
  

    AnticoagulationCurative: {
      type:Boolean,
      required:true,
    
    },

    ThrombolyseIV: {
      type:Boolean,
      required:true,
    
    },

    DateTIV:{
      type:Date,
      
    
    },
    Actilyse:{
      type:String ,
      enum : ["Oui", "Non" , "ND"],
      
   },
    Metalyse:{
      type:String,
      enum : ["Oui", "Non" , "ND"],
      
   },
  

   NIHSS24h:{
    type: String,

    
 },

  matricule: {
    type: String,
    ref: 'Hospitalisation',
    required: true,
  },


  });
  
  export default mongoose.model('ConduiteTenirInitiale', conduitetenirinitialeSchema);
  