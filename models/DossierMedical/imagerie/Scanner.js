import mongoose from 'mongoose';
const scannerSchema = new mongoose.Schema({
  

   
 matricule: {
    type: String,
    ref: 'Hospitalisation',
    required: true,
  },

  


    status:{
      type: String,
      required: true,
    },
   
    DateScanner: { type: Date },
   
    AngioscanTSA_Willis:{
      type: String,
    
    },
    Occlusin:{
      type: String,
    
    },
  Stenose:{
   type : String,
  },

    Description:{
      type: String,
    
    },
  Score : {
    type: Number, enum: [ 0, 1, 2, 3, 4,5,6,7,8,9,10] ,required: true
  },

    ACGauche:{
      type: String,
    
    },
    ACDroite:{
      type: String,
    
    },

    troncbasilaire:{
      type:String,
    },

    AVGauche:{
      type: String,
    
    },
    AVDroite:{
      type: String,
    
    },

  AngioWillisGauche :{
    type: String,

  },
  AngioWillisDroite:{
    type: String,

  },

  AngioTSAGauche :{
      type: String,
      
    },
    AngioTSADroite:{
      type: String,
    
    },
   
    AVOcclusion:{
      type: String,
   
    },




  
});

export default mongoose.model('Scanner', scannerSchema);
