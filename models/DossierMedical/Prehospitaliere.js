import mongoose from "mongoose";
import BaseTabSchema from "./BaseTabSchema.js";

const cleanObject = (obj) => {
  for (const key in obj) {
    if (obj[key] === "" || obj[key] === null || obj[key] === undefined) {
      delete obj[key];
    }
  }
};

const prehospitalSchema = new mongoose.Schema(
  {
    quiAppelNeurologue: {
      type: String,
      enum: [
        "SAMU",
        "Urgences Sahloul",
        "Urgences Hached",
        "Consultations externes",
        "Autres",
        "Autre", // Temporary - for backward compatibility with existing data
      ],
      required: false,
    },
    dateDebutSymptome: { type: Date },
    dateAppelNeurologue: { type: Date },
    motifAppel: {
      type: String,
      enum: [
        "Lourdeur d'un hemicorps",
        "Trouble de l'élocution",
        "Trouble de langage",
        "Trouble visuel",
        "Cephalées",
        "Vertiges",
        "Trouble de la conscience",
        "Autres",
        "Autre motif", // Temporary - for backward compatibility with existing data
        "",
      ],
      required: false, // Ensures it is required only if defined
    },
    autre1: { type: String, trim: true },
    autre2: { type: String, trim: true },
    matricule: { type: String, ref: "Hospitalisation", required: true },
    dossier: { type: mongoose.Schema.Types.ObjectId, ref: "Dossier" },
    reviewInfo: { type: BaseTabSchema, default: () => ({}) },

    dossierMedical: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "DossierMedical",
    },
  },
  { timestamps: true },
);

prehospitalSchema.pre("save", function (next) {
  cleanObject(this);
  
  // Clean enum values for backward compatibility
  if (this.quiAppelNeurologue === "Autre") {
    this.quiAppelNeurologue = "Autres";
  }
  if (this.motifAppel === "Autre motif") {
    this.motifAppel = "Autres";
  }
  
  next();
});

// Also clean data for update operations
prehospitalSchema.pre(["updateOne", "findOneAndUpdate"], function (next) {
  const update = this.getUpdate();
  
  // Clean enum values in update operations
  if (update.quiAppelNeurologue === "Autre") {
    update.quiAppelNeurologue = "Autres";
  }
  if (update.motifAppel === "Autre motif") {
    update.motifAppel = "Autres";
  }
  
  next();
});

export default mongoose.model("Prehospitaliere", prehospitalSchema);
