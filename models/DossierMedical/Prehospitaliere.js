import mongoose from "mongoose";

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
            enum: ["SAMU", "Urgences Sahloul", "Urgences Hached", "Consultations externes", "Autres"],
            required: false
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
                ""
            ],
            required: false // Ensures it is required only if defined
        },
        autre1: { type: String, trim: true },
        autre2: { type: String, trim: true },
        matricule: { type: String, ref: "Hospitalisation", required: true },
        dossier: { type: mongoose.Schema.Types.ObjectId, ref: "Dossier" },
        dossierMedical: { type: mongoose.Schema.Types.ObjectId, ref: "DossierMedical" }
    },
    { timestamps: true }
);

prehospitalSchema.pre("save", function (next) {
    cleanObject(this);
    next();
});

export default mongoose.model("Prehospitaliere", prehospitalSchema);
