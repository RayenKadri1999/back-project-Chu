import mongoose from "mongoose";

// Define schema with flexible fields
const examensComplementairesSchema = new mongoose.Schema(
    {
      ETT: { type: Boolean, default: false },
      DescETT: { type: String, trim: true },
      ETO: { type: Boolean, default: false },
      DescETO: { type: String, trim: true },
      TélémétrieCardiaque: { type: Boolean, default: false },
      DescTélémétrieCardiaque: { type: String, trim: true },
      Arteriographie: { type: Boolean, default: false },
      DescArteriographie: { type: String, trim: true },
      HolterRythmique: { type: Boolean, default: false },
      DescHolterRythmique: { type: String, trim: true },
      EDTSA: { type: Boolean, default: false },
      DescEDTSA: { type: String, trim: true },
      EDTC: { type: Boolean, default: false },
      DescEDTC: { type: String, trim: true },
      AutreExamens: { type: Boolean, default: false },
      DescAutreExamens: { type: String, trim: true },
        matricule: { type: String, ref: "Hospitalisation", required: true },
        dossier: { type: mongoose.Schema.Types.ObjectId, ref: "Dossier" },
        dossierMedical: { type: mongoose.Schema.Types.ObjectId, ref: "DossierMedical" }
    },
    {
      timestamps: true, // Adds createdAt & updatedAt fields
      minimize: true, // Prevents storing empty objects
    }
);

// Middleware to remove empty fields before saving
examensComplementairesSchema.pre("save", function (next) {
    function clean(doc) {
        Object.keys(doc).forEach((key) => {
            if (
                doc[key] === '' ||
                doc[key] === null ||
                doc[key] === undefined ||
                (typeof doc[key] === 'object' && !Array.isArray(doc[key]) && Object.keys(doc[key]).length === 0)
            ) {
                delete doc[key];
            } else if (typeof doc[key] === 'object' && !Array.isArray(doc[key])) {
                clean(doc[key]); // Recursive cleaning for nested objects
            }
        });
    }
    clean(this);
    next();
});

// Export model
const ExamensComplementaires = mongoose.model("ExamensComplementaires", examensComplementairesSchema);
export default ExamensComplementaires;
