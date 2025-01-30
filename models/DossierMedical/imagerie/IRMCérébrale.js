import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const irmcerebraleSchema = new Schema({
  matricule: {
    type: String,
    ref: 'Hospitalisation', // Ensure this reference is set up properly in your database
    required: true,
  },
  status: {
    type: String,
    enum: ["Oui", "Non"],
    default: "Non"
  },
  dateIRM: {
    type: Date,
    default: Date.now
  },
  dateFinIRM: {
    type: Date,
    default: Date.now
  },
  IRM_Cerebrale: {
    type: String,
    enum: ["Normale", "Anormale"],
    default: ""
  },
  Diffusion1: {
    type: String,
    enum: ["Normale", "Anormale"],
    default: ""
  },
  Diffusion2: {
    type: String,
    enum: ["Lacunaire", "Non Lacunaire"],
    default: ""
  },
  Details: {
    type: [String],
    default: []
  },
  checkZone: {
    CerebralmoyenD: { type: Boolean, default: false },
    CerebralmoyenG: { type: Boolean, default: false },
    CerebralanterieurG: { type: Boolean, default: false },
    CerebralanterieurD: { type: Boolean, default: false },
    CerebralposterieurG: { type: Boolean, default: false },
    CerebralposterieurD: { type: Boolean, default: false },
    PontiqueparamedianG: { type: Boolean, default: false },
    PontiqueparamedianD: { type: Boolean, default: false },
    LaterobulbaireG: { type: Boolean, default: false },
    LaterobulbaireD: { type: Boolean, default: false },
    Latero_pontiqueG: { type: Boolean, default: false },
    Latero_pontiqueD: { type: Boolean, default: false },
    PICAG: { type: Boolean, default: false },
    PICAD: { type: Boolean, default: false },
    AICAG: { type: Boolean, default: false },
    AICAD: { type: Boolean, default: false },
    ACSG: { type: Boolean, default: false },
    ACSD: { type: Boolean, default: false },
    AttributeOption: { type: String, default: "" },
    JonctionelG: { type: Boolean, default: false },
    JonctionelD: { type: Boolean, default: false }
  }
}, { timestamps: true });

// Pre-save Middleware for Logical Integrity
irmcerebraleSchema.pre('save', function (next) {
  // If status is "Non", reset dependent fields
  if (this.status === 'Non') {
    this.dateIRM = undefined;
    this.dateFinIRM = undefined;
    this.IRM_Cerebrale = undefined;
    this.Diffusion1 = undefined;
    this.Diffusion2 = undefined;
    this.Details = [];
    this.checkZone = {
      CerebralmoyenD: false,
      CerebralmoyenG: false,
      CerebralanterieurG: false,
      CerebralanterieurD: false,
      CerebralposterieurG: false,
      CerebralposterieurD: false,
      PontiqueparamedianG: false,
      PontiqueparamedianD: false,
      LaterobulbaireG: false,
      LaterobulbaireD: false,
      Latero_pontiqueG: false,
      Latero_pontiqueD: false,
      PICAG: false,
      PICAD: false,
      AICAG: false,
      AICAD: false,
      ACSG: false,
      ACSD: false,
      AttributeOption: "",
      JonctionelG: false,
      JonctionelD: false
    };
  }

  // If IRM_Cerebrale is not "Anormale", reset related fields
  if (this.IRM_Cerebrale !== 'Anormale') {
    this.Diffusion1 = undefined;
    this.Diffusion2 = undefined;
    this.Details = [];
    this.checkZone = {
      CerebralmoyenD: false,
      CerebralmoyenG: false,
      CerebralanterieurG: false,
      CerebralanterieurD: false,
      CerebralposterieurG: false,
      CerebralposterieurD: false,
      PontiqueparamedianG: false,
      PontiqueparamedianD: false,
      LaterobulbaireG: false,
      LaterobulbaireD: false,
      Latero_pontiqueG: false,
      Latero_pontiqueD: false,
      PICAG: false,
      PICAD: false,
      AICAG: false,
      AICAD: false,
      ACSG: false,
      ACSD: false,
      AttributeOption: "",
      JonctionelG: false,
      JonctionelD: false
    };
  }

  next();
});

// Export the model
export default mongoose.model('IRMCérébrale', irmcerebraleSchema);