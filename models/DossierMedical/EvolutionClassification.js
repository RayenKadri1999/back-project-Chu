import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const evolutionClassificationSchema = new mongoose.Schema({
  PlanClinique:{type : Boolean , default : null},
  PlanEtiologique:{type : Boolean , default : null},
  PlanThérapeutique:{type : Boolean , default : null},
  DescPlanClinique:{type : String , default : null},
  DescPlanEtiologique:{type : String , default : null},
  DescPlanThérapeutique:{type : String , default : null},
  PneumopathieInhalation:{type : String , default : null},
  InfectionUrinaire:{type : String , default : null},
  EmboliePulmonaire:{type : String , default : null},
  ThromboseVeineuseProfonde:{type : String , default : null},
  HemorragieExtracranienne:{type : String , default : null},
  Escarre:{type : String , default : null},

 

  
  matricule: {
    type: String,
    ref: 'Hospitalisation',
    required: true,
  },
  dossier: { type: mongoose.Schema.Types.ObjectId, ref: "Dossier" },
  dossierMedical: { type: mongoose.Schema.Types.ObjectId, ref: "DossierMedical" }
},{
  timestamps: true, // Adds createdAt & updatedAt fields
  minimize: true, // Prevents storing empty objects
});
evolutionClassificationSchema.pre('save', function (next) {
  const cleanedData = {};
  Object.keys(this._doc).forEach((key) => {
    if (this[key] !== null && this[key] !== undefined && this[key] !== '') {
      cleanedData[key] = this[key];
    }
  });
  this._doc = cleanedData;
  next();
});

export default mongoose.model('EvolutionClassification', evolutionClassificationSchema);
