
import mongoose from "mongoose";
const Schema = mongoose.Schema;

const examencliniqueSchema = new Schema({
  


    
  NIHSSValue :   {
  type: Number,
},
idNIHSS:{
  type: Schema.Types.ObjectId,
  ref: 'NIHSS',
},

LASTInitial :   {
    type: Number,
  },

  ResultExamenNeuroInitial: {
    type: String,
   
  },


  TA : {
  type: String,
  
},
Dextro : {
  type: String,

},
AuscultationCardiaque :{
    type: String,
   
  },
  AuscultationPulmonaire :{
  type: String,
  
}, 
SouffleCarotidien :  {
  type: String,
  enum : ["Oui", "Non"],
},

ResultsExamenGeneral: {
  type: String,

},
testDeglutition: {
  testDone: {
    type: Boolean,
  },
  hasTrouble: {
    type: Boolean,
    required: function() { return this.testDeglutition.testDone; }, 
  },
  typeOfTrouble: {
    type: String,
    enum: ["Aux liquides", "Aux solides", "Globale",""],
    required: function() { return this.testDeglutition.testDone && this.testDeglutition.hasTrouble; },
  },
},



  matricule: {
    type: String,
    ref: 'Hospitalisation',
    required: true,
  },


  });
  
  export default mongoose.model('ExamenClinique', examencliniqueSchema);
  