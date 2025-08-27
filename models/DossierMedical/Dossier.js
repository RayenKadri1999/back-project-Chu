import mongoose from "mongoose";
const Schema = mongoose.Schema;
const dossierSchema = new Schema({
  matricule: {
    type: String,
    ref: "Hospitalisation",
    required: true,
  },
  entreeFaitPar: {
    type: String,
    required: true,
  },
  dateEntree: {
    type: Date,
    required: true,
  },
  sortieFaitPar: {
    type: String,
    required: true,
  },
  dateSortie: {
    type: Date,
    required: true,
  },
  infarctusCerebral: {
    type: String,
    // enum: ["AIT", "AVC", "trembolyse", "Hématome cérébral", "Stroke mimics", "Thrombose veineuse cérébrale", "Autre"],
    enum: ["Hématome cérébral", "Infarctus cérébral"],
    required: true,
  },
  status: {
    type: String,
    enum: ["En cours", "Accepté", "refusé"],
    default: "En cours",
  },
});

export default mongoose.model("Dossier", dossierSchema);
