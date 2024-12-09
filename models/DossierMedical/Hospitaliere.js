import mongoose from "mongoose";
const Schema = mongoose.Schema;
const hospitaliereSchema = new Schema({
   

 Allergies :   {
  type: String,
  enum: ["Non", "Oui"],
  required: true,
},

 HTA :   {
    type: String,
    enum: ["Non", "Oui"],
    required: true,
  },
 Hypercholestérolémie : {
  type: String,
  enum: ["Non", "Oui"],
  required: true,
},
 Diabète : {
  type: String,
  enum: ["Non", "Oui"],
  required: true,
},
 Fibrillation_auriculaire :{
    type: String,
    enum: ["paroxystique", "permanente"],
    required: true,
  },
  Ancienneté_fibrillation :{
  type: String,
  enum: ["Non", "Oui"],
  required: true,
}, 
 SAS :  {
  type: String,
  enum: ["Non", "Oui"],
  required: true,
},       
SAS_appareillé :{
  type: String,
  enum: ["Non", "Oui"],
  required: true,
},
AIT :{
  type: String,
  enum: ["Non", "Oui"],
  required: true,
},
 AVC:{
  type: String,
  enum: ["ischémique", "hémorragique"],
  required: true,
},

 Cardiopathie_ischémique :  {
  type: String,
  enum: ["Non", "Oui"],
  required: true,
},
 Artériopathie : {
  type: String,
  enum: ["Non", "Oui"],
  required: true,
},
 Autres_antécédents:{
  type: String,

},

Vit :{
  type: String,
  enum: ["seul", "en famille", "en institution","Autre"],
  required: true,
},
 Latéralité :  {
  type: String,
  required: true,
},
 Profession :  {
  type: String,
  required: true,
},
 Autonomie : {
  type: String,
  enum: ["Totale", "Partielle"],
  required: true,
},
 Tabagisme :  {
  type: String,
  required: true,
},
 Chicha : {
  type: String,
  required: true,
},
 Neffa :  {
  type: String,
  required: true,
},
 Consommation_alcool :  {
  type: String,
  required: true,
},
 Rankin_préAVC :  {
  type: Number,
  required: true,
},
 GIR :  {
  type: Number,
  required: true,
},
 Poids :   {
  type: Number,
  required: true,
},
 Taille :    {
  type: Number,
  required: true,
},
  IMC : {
    type: Number,
    required: true,
  },
  matricule: {
    type: String,
    ref: 'Hospitalisation',
    required: true,
  },

  HistoireMaladie:{
    type: String,
  
  },
  TraitementEntrée:{
    type: String,
    
  },

  });
  
  export default mongoose.model('Hospitaliere', hospitaliereSchema);
  