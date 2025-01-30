import mongoose from "mongoose";
const Schema = mongoose.Schema;
const biologieSchema = new Schema({

  Sodium: { type: Number, default: null },
  Potassium: { type: Number, default: null },
  Urée: { type: Number, default: null },
  Créatinine: { type: Number, default: null },
  CRP: { type: Number, default: null },
  CPK: { type: Number, default: null },
  HbA1C: { type: Number, default: null },
  Myoglobine: { type: Number, default: null },
  Troponine: { type: Number, default: null },
  NT_pro_BNP: { type: Number, default: null },
  VSH1: { type: Number, default: null },
  Hémoglobine: { type: Number, default: null },
  Leucocytes: { type: Number, default: null },
  Plaquettes: { type: Number, default: null },
  D_dimères: { type: Number, default: null },
  Monomères_de_fbrine: { type: Number, default: null },
  Fibrinogène: { type: Number, default: null },
  TP: { type: Number, default: null },
  Ratio_TCA: { type: Number, default: null },
  ASAT_GOT: { type: Number, default: null },
  ALAT_GPT: { type: Number, default: null },
  GGT: { type: Number, default: null },
  PAL: { type: Number, default: null },
  Hdl_Ch: { type: Number, default: null },
  Ldl_Ch: { type: Number, default: null },
  TG: { type: Number, default: null },
  CT_Total: { type: Number, default: null },
  Bilirubine_totale: { type: Number, default: null },
  Bilirubine_libre: { type: Number, default: null},

  matricule: {
    type: String,
    ref: 'Hospitalisation',
    required: true,
  },},

{ timestamps: true});
  
  export default mongoose.model('Biologie', biologieSchema);
  