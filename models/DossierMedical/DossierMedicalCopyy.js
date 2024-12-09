// import mongoose from "mongoose";
// const Schema = mongoose.Schema;
// const dossierSchema = new mongoose.Schema(
//   {
//     matricule: { type: String, required: true , unique: true},
//     patientRef: {
//       type: String,
//       required: true,
//     },
    
      
//     entreeFaitPar:  { type: String, required: true },
//     dateEntree :  { type: Date, required: true },
//     sortieFaitPar:  { type: String, required: true },
//     dateSortie :  { type: Date, required: true },
//     //infarctusCerebral : kifech ncochii aleha yatl3ouli : AIT , Infractus AVC constitué AVC et AIT ijiw ma3 b3adh'hom , trembolyse(hedhy tji ma3 AIT) (les 3 hedhom najm) et "Hématome cérébral" yee nenzel hedhy yee hedhy et autre (Text field) 
//    //fel autre tnajm t'hot "Stroke mimics" ou "Thrombose veineuse cérébral" + "text"
//     infarctusCerebral: {
//         type: String,
//         enum: ["AIT","AVC" ,"trembolyse" ],/////////!!!
//         required: true
//       },



      
//       //fama page Phase pré-hospitalère et page okhra hospital 
//       //Phase pré-hospitalère
//       quiAppelNeurologue: {
//         type: String,
//         enum: ["SAMU", "Urgences Sahloul","Urgences Hached", "Consultations externes","Autres"], // autre : text 
//         required: true
//       },
//       dateDebutSymptome :  { type: Date, required: true },
//       heureDebutSymptome : {
//         type: String,
//         required: true,
//         validate: {
//           validator: function (heure) {
//             // Utiliser une expression régulière pour vérifier le format "hh:mm"
//             return /^([01]\d|2[0-3]):[0-5]\d$/.test(heure);
//           },
//           message: "Le champ 'heure' doit être au format 'hh:mm'. Exemple: 09:30",
//         },
//       },
//       dateAppelNeurologue :  { type: Date, required: true },
//       heureAppelNeurologue : {
//         type: String,
//         required: true,
//         validate: {
//           validator: function (heure) {
//             // Utiliser une expression régulière pour vérifier le format "hh:mm"
//             return /^([01]\d|2[0-3]):[0-5]\d$/.test(heure);
//           },
//           message: "Le champ 'heure' doit être au format 'hh:mm'. Exemple: 09:30",
//         },
//       },
//       motifAppel :  {
//         type: String,
//         enum: ["Lourdeur d'un hemicorps", "Trouble de langage","Trouble visuel","Cephalées vertiges","Trouble de la conscience","Autres"],
//         required: true
//       },
//       //Phase hospitalère
//       antecedents :  {
//         type: String,
//         enum: ["Allergie", "HTA","Hypercholestérolémie","Diabète","Fibrillation auriculaire:paroxystique/permanente:ancienneté","SAS:appreillé","AIT","AVC ischémique/hémorragique","Cardiopathie ischémique:","Artériopathie des membres inférieurs","Autres"],//najm ncochi akther men wahda
//         required: true
//       },
//    //mode de vie
//    vit :  {
//     type: String,
//     enum: ["seul", "en famille","en institution","autre"],
//     required: true
//   },
//   latéralité:  { type: String, required: true },///!!!!!! gaucher ou droit yee hedhy yee hedhy 
//   autonomie:  { type: String, required: true },// conservé ou nn conservé : options 
//   consommation:{//
//     type: String,
//     enum: ["Tabagisme", "Chicha","Neffa","Consommation d'alcool","aucun"],//ma3 kol wahda nhot pourcentage de chacune
//     required: true
//   },
//   rankinPreAVC:  { type: String, required: true }, // 0..6 
//   gir:  { type: String, required: true }, //entier entre 0..6 
//   poids:  { type: Number, required: true }, //un reel 
//   taille:  { type:  Number, required: true }, //un reel 
//   imc:  { type:  Number, required: true }, //calcul auto d'apres taille et poids (poids/taille^2)
//   traitementHabituel:  { type: String, required: true },//text
//   histoireMaladie:  { type: String, required: true },//text
//   examenNeurologieInitial:  { type: String, required: true },//text
//   last:  { type: String, required: true },//chiffre
//   nihss:  { type: String, required: true },//score tetcochaa .. page okhra feha ken el nihss feha des champs 
//   ta:  { type: String, required: true },//champs fyh des chiffres rééel 
//   dextro:  { type: String, required: true },//champs fyh des chiffres  rééel
//   ausculationsCardiaque:  { type: String, required: true },//textfield
//   ausculationsPulmonaire:  { type: String, required: true },//textField
//   ausculationsCarotidienne:  { type: String, required: true },//textfield
//   presenceSouffleCarotidien:  { 
//                 type: String, 
//                 enum: ["Non", "Oui"],
//                 required: true 
//               },

//   },
//   //Imagerie Initiale 
//   { timestamps: true } //indique automatiquement date de creation et d'update de dossier
// );

// export default mongoose.model("Dossier", dossierSchema);