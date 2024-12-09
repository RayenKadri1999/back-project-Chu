import mongoose from "mongoose";
const Schema = mongoose.Schema;
const biologieSchema = new Schema({
  


    
    Sodium :   {
  type: Number,
  required: true,
},

Potassium :   {
    type: Number,
    required: true,
  },
  Urée : {
  type: Number,
  required: true,
},
Créatinine : {
  type: Number,
  required: true,
},
CRP :{
    type: Number,
   
    required: true,
  },
  CPK :{
  type: Number,
  required: true,
}, 
Myoglobine :  {
  type: Number,
  required: true,
},       

Troponine :{
  type: Number,
  required: true,
},
NT_pro_BNP:{
  type: Number,
 
  required: true,
},

HbA1c :  {
  type: Number,
  required: true,
},
Hémoglobine :  {
    type: Number,
    required: true,
  },
Leucocytes : {
  type: Number,
  required: true,
},
Plaquettes:{
  type: Number,
  required: true,
},

D_dimères :{
  type: Number,
 
  required: true,
},
Monomères_de_fbrine :{
    type: Number,
   
    required: true,
  },
Fibrinogène :  {
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
ASAT_GOT : {
  type: Number,
  
  required: true,
},
ALAT_GPT :  {
  type: Number,
  required: true,
},
GGT : {
  type: Number,
  required: true,
},
PAL :  {
  type: Number,
  required: true,
},
Bilirubine_totale :  {
  type: Number,
  required: true,
},
Bilirubine_libre :  {
  type: Number,
  required: true,
},
 
  matricule: {
    type: String,
    ref: 'Hospitalisation',
    required: true,
  },


  });
  
  export default mongoose.model('Biologie', biologieSchema);
  