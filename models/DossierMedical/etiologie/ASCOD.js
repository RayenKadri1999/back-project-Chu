import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const ascodSchema = new mongoose.Schema({
  

   
 matricule: {
    type: String,
    ref: 'Hospitalisation',
    required: true,
  },
    A:{
      type: Number,
      default : null
    },
    S:{
      type: Number,
default : null    },
    C:{
      type: Number,
      default : null  ,
    },
    O:{
      type: Number,
      default : null  ,
    },
    D:{
      type: Number,
      default : null  ,
    },
   
   info:{
    type: String,
    default : null  ,
  },


    dossier: { type: mongoose.Schema.Types.ObjectId, ref: "Dossier" },
    dossierMedical: { type: mongoose.Schema.Types.ObjectId, ref: "DossierMedical" }

},{
    timestamps: true, // Adds createdAt & updatedAt fields
    minimize: true,} // Prevents storing empty objects
);

export default mongoose.model('ASCOD', ascodSchema);
