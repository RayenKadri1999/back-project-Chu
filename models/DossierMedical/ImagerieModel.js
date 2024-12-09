import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const imagerieSchema = new mongoose.Schema({
  

//   IRM:{ type: String, required: true },
   
//     DWI:{
//       type: String,
//       required: true,
//     }, 
//     TOF_Willis:{
//       type: String,
//       required: true,
//     }, 
//     FLAIR:{
//       type: String,
//       required: true,
//     }, 
//     SWAN:{
//   type: String,
//   required: true,
// }, 
//     Angio_TDM:{
//       type: String,
//       required: true,
//     }, 
//     date_TDM_Angio:{ type: Date, required: true },
  
//     ECG :{
//   type: String,
//   required: true,
// }, 
//     TP :{
//   type: String,
//   required: true,
// }, 
//     Ratio_TCA :{
//   type: String,
//   required: true,
// }, 
//     D_dimères :{
//   type: String,
//   required: true,
// }, 
//     Fibrinogène :{
//   type: String,
//   required: true,
// }, 
//     Plaquettes :{
//   type: String,
//   required: true,
// }, 
//     Hémoglobine :{
//   type: String,
//   required: true,
// }, 

// dateIRM:{ type: Date, required: true },
// dateFinIRM:{ type: Date, required: true },
   
    Synthèse  :{
  type: String,
  required: true,
}, 
Synthèseflair:{
  type: String,
  required: true,
}, 
      SynthèsetofWillis:{
        type: String,
        required: true,
      }, 
      Synthèset2Swan:{
        type: String,
        required: true,
      }, 
      SynthèseASL:{
        type: String,
        required: true,
      }, 
      SynthèseDWI:{
        type: String,
        required: true,
      }, 

 matricule: {
    type: String,
    ref: 'Hospitalisation',
    required: true,
  },

  

  
});

export default mongoose.model('Imagerie', imagerieSchema);
