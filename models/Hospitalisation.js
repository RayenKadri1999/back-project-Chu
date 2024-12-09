import mongoose from "mongoose";

const HospitalisationSchema = new mongoose.Schema({
 
  entreeFaitPar:{ type: String, required: true },
  sortieFaitPar:{ type: String },
  dateEntree: { type: Date, required: true },
  dateSortie:{ type: Date},
  TypeAVC: { type: String, required: true },
  status:{ type: String, required: true },
  _id: { type: String },

 
  // aidantPrincipal: { type: String, required: true },// membre famille (soeur, frere.. )
  // numeroAidantPrincipal: { type: Number },// num tel 
  // signatureDocteur : { type: String, required: true },//qui a creer ce hospitalisation
  dossier: { type: String,ref: 'Patient', required: true },
}, { timestamps: true });



export default mongoose.model("Hospitalisation", HospitalisationSchema);
