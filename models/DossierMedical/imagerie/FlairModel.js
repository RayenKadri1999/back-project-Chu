import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const flairSchema = new mongoose.Schema({
  

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
//     Dosage  :{
//   type: String,
//   required: true,
// }, 
// dateIRM:{ type: Date, required: true },
// dateFinIRM:{ type: Date, required: true },
   
 matricule: {
    type: String,
    ref: 'Hospitalisation',
    required: true,
  },

  




    Status:{
      type: String,
      required: true,
    },
    Details:{
      type: Array,
   
    },
    SequentielleAVC:{
      type: String,
     
    },
    Cortex:{
      type: String,
   
    },
    SubstanceBlanche:{
      type: String,
      
    },
    NoyauGris:{
      type: String,
 
    },
    Score_Collatéralité:{
      type: Number,
   
    },
    Peri_ventriculaire:{
      type: String,
  
    },
    sous_corticale:{
      type: String,
   
    },
    Peri_ventriculaire:{
      type: String,
 
    },
    Score_Fazekas:{
      type: Number,
    
    },

  
});

export default mongoose.model('Flair', flairSchema);
