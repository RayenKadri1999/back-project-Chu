import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const initialSchema = new mongoose.Schema({
  // ECG details
  ECG: { type: String, required: true },

  // Blood tests
  TP: { type: String, required: true },
  ratioTCA: { type: String, required: true },
  INR: { type: String, required: true },
  dDimers: { type: String, required: true },
  fibrinogene: { type: String, required: true },
  plaquettes: { type: String, required: true },
  hemoglobine: { type: String, required: true },
  dosageSpecifique: { type: String, required: true },// activité anti Xa

  // Conclusion initiale
  conclusionInitiale: { type: String, required: true },

  // Décision thérapeutique initiale
  doubleAntiAggregationPlaquettaire: { type: String, required: true },
  anticoagulationCurative: { type: String, required: true },
  thrombolyseIV: {
    type: String,
    enum: [ "oui", "non"],
    required: true,
  },
    dateTIV: { type: Date, required: true },
    heureTIV: { type: String, required: true },
    moleculeUtilisee: { type: String, enum: [ "Actilyse", "Metalyse"], required: true },
 matricule: {
    type: String,
    ref: 'Hospitalisation',
    required: true,
  },

});

export default mongoose.model('Initial', initialSchema);
