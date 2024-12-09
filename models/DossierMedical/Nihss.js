import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const nihssSchema = new mongoose.Schema({
  // Catégorie
  categorie: { type: String, required: true },

  // Date and Heure
  date: { type: Date, required: true },
 

  // Total auto.
  totalAuto: { type: Number , required: true },

  // Subcategories
  vigilance: { type: Number,  enum: [ 0, 1, 2, 3, 4]  , required: true },//0..4
  orientation: { type: Number, enum: [ 0, 1, 2, 3, 4] , required: true },//0..4
  commandes: { type: Number, enum: [ 0, 1, 2, 3, 4] ,required: true },//0..4
  oculomotricite: { type: Number,enum: [ 0, 1, 2, 3, 4] , required: true },//0..4
  champVisuel: { type: Number,enum: [ 0, 1, 2, 3, 4] , required: true },//0..4
  paralysieFaciale: { type: Number,enum: [ 0, 1, 2, 3, 4] , required: true },//0..4
//tous les champs //0..4


  // Sa Motricité membre sup.G
  motriciteMembreSupG: { type: Number, enum: [ 0, 1, 2, 3, 4] ,required: true },

  // Motricité membre sup. (D)
  motriciteMembreSupD: { type: Number,enum: [ 0, 1, 2, 3, 4] , required: true },

  // Motricité membre int. (G)
  motriciteMembreIntG: { type: Number,enum: [ 0, 1, 2, 3, 4] , required: true },

  // Motricité membre int. (D)
  motriciteMembreIntD: { type: Number,enum: [ 0, 1, 2, 3, 4] , required: true },

  ataxie: { type: Number,enum: [ 0, 1, 2, 3, 4] , required: true },
  sensibilite: { type: Number,enum: [ 0, 1, 2, 3, 4] , required: true },
  langage: { type: Number,enum: [ 0, 1, 2, 3, 4] , required: true },
  dysarthrie: { type: Number, enum: [ 0, 1, 2, 3, 4] ,required: true },
  extinctionNegligence: { type: Number,enum: [ 0, 1, 2, 3, 4] , required: true },
  matricule: {
    type: String,
    ref: 'Hospitalisation',
    required: true,
  },
  dossierMedical: { type: Schema.Types.ObjectId, ref: ' DossierMedical' },

});

export default mongoose.model('NIHSS', nihssSchema);
