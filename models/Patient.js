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
  telephone: { type: String,default:null, },
  email:{ type: String,default:null},
  dateNaissance : { type: String,default:null, required: true },
  
  aidantPrincipal: { type: String,default:null,},// membre famille (soeur, frere.. )
  numeroAidantPrincipal: { type: String,default:null },// num tel
  signatureDocteur : { type: String,default:null,},//qui a creer ce patient
  
}, { timestamps: true });
PatientSchema.pre('save', function (next) {
  const cleanedData = {};
  Object.keys(this._doc).forEach((key) => {
    if (this[key] !== null && this[key] !== undefined && this[key] !== '') {
      cleanedData[key] = this[key];
    }
  });
  this._doc = cleanedData;
  next();
});


export default mongoose.model("Patient", PatientSchema);
