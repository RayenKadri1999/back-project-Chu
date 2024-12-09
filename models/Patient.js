import mongoose from "mongoose";

const PatientSchema = new mongoose.Schema({
  Nom: { type: String, required: true },
  Prenom: { type: String, required: true },
  sexe: {
    type: String,
    enum: ["homme", "femme"],
    required: true,
  },
  numero_dossier:{type:String},
  _id:{ type: String },
  
  Adresse:{ type: String, required: false },
  telephone: { type: String },
  email:{ type: String},
  dateNaissance : { type: String, required: true },
  
  aidantPrincipal: { type: String},// membre famille (soeur, frere.. )
  numeroAidantPrincipal: { type: String },// num tel 
  signatureDocteur : { type: String},//qui a creer ce patient
  
}, { timestamps: true });



export default mongoose.model("Patient", PatientSchema);
