import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const scannerperfusionSchema = new mongoose.Schema({
  

   
 matricule: {
    type: String,
    ref: 'Hospitalisation',
    required: true,
  },

  


    status:{
      type: String,
      required: true,
    },
    DateScanner: {
      type: Date,
      
    },
   
   



  
});

export default mongoose.model('ScannerPerfusion', scannerperfusionSchema);
