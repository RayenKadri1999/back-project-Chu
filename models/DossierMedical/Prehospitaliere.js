import mongoose from "mongoose";
const Schema = mongoose.Schema;
const prehospitaliereSchema = new Schema({
    quiAppelNeurologue: {
      type: String,
      enum: ["SAMU", "Urgences Sahloul", "Urgences Hached", "Consultations externes", "Autres"],
      required: true
    },
    dateDebutSymptome: { type: Date, required: true },
    // heureDebutSymptome: {
    //   type: String,
    //   required: true,
    //   validate: {
    //     validator: function (heure) {
    //       return /^([01]\d|2[0-3]):[0-5]\d$/.test(heure);
    //     },
    //     message: "Le champ 'heure' doit être au format 'hh:mm'. Exemple: 09:30",
    //   },
    // },
    dateAppelNeurologue: { type: Date, required: true },
    // heureAppelNeurologue: {
    //   type: String,
    //   required: true,
    //   validate: {
    //     validator: function (heure) {
    //       return /^([01]\d|2[0-3]):[0-5]\d$/.test(heure);
    //     },
    //     message: "Le champ 'heure' doit être au format 'hh:mm'. Exemple: 09:30",
    //   },
    // },
    motifAppel: {
      type: String,
      enum: ["Lourdeur d'un hemicorps", "Trouble de l'élocution", "Trouble de langage", "Trouble visuel", "Cephalées vertiges", "Trouble de la conscience", "Autres"],
      required: true
    },
    autre1: {
      type: String,
    },
    autre2: {
      type: String,
    },
    dossier: { type: Schema.Types.ObjectId, ref: 'Dossier' },
    dossierMedical: { type: Schema.Types.ObjectId, ref: ' DossierMedical' },

    matricule: {
    type: String,
    ref: 'Hospitalisation',
    required: true,
  },
  });
  
  
  export default mongoose.model('Prehospitaliere', prehospitaliereSchema);
  