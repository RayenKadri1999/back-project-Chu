import mongoose from "mongoose";
const Schema = mongoose.Schema;
const hospitaliereSchema = new Schema({
   

 Allergies :   {
  type: String,
  enum: ["Non", "Oui"],

},

 HTA :   {
    type: String,
    enum: ["Non", "Oui"],

  },
 Hypercholestérolémie : {
  type: String,
  enum: ["Non", "Oui"],

},
 Diabète : {
  type: String,
  enum: ["Non", "Oui"],

},
 Fibrillation_auriculaire :{
    type: String,
    enum: ["paroxystique", "permanente"],

  },
  Ancienneté_fibrillation :{
  type: String,
  enum: ["Non", "Oui"],

}, 
 SAS :  {
  type: String,
  enum: ["Non", "Oui"],

},       
SAS_appareillé :{
  type: String,
  enum: ["Non", "Oui"],

},
AIT :{
  type: String,
  enum: ["Non", "Oui"],

},
 AVC:{
  type: String,
  enum: ["ischémique", "hémorragique"],

},

 Cardiopathie_ischémique :  {
  type: String,
  enum: ["Non", "Oui"],

},
 Artériopathie : {
  type: String,
  enum: ["Non", "Oui"],

},
 Autres_antécédents:{
  type: String,

},

Vit :{
  type: String,
  enum: ["seul", "en famille", "en institution","Autre"],

},
 Latéralité :  {
  type: String,

},
 Profession :  {
  type: String,

},
 Autonomie : {
  type: String,
  enum: ["Totale", "Partielle"],

},
 Tabagisme :  {
  type: String,

},
 Chicha : {
  type: String,

},
 Neffa :  {
  type: String,

},
 Consommation_alcool :  {
  type: String,

},
 Rankin_préAVC :  {
  type: Number,

},
 GIR :  {
  type: Number,

},
 Poids :   {
  type: Number,

},
 Taille :    {
  type: Number,

},
  IMC : {
    type: Number,

  },
  matricule: {
    type: String,
    ref: 'Hospitalisation',

  },

  HistoireMaladie:{
    type: String,
  
  },
  TraitementEntrée:{
    type: String,
    
  },

  });
  
  export default mongoose.model('Hospitaliere', hospitaliereSchema);
  