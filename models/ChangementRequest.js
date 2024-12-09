import mongoose from "mongoose";
import Biologie from "./DossierMedical/Biologie.js";
import ConclusionSortie from "./DossierMedical/ConclusionSortie.js";
import Dossier from "./DossierMedical/Dossier.js"
import EvolutionClassification from "./DossierMedical/EvolutionClassification.js"
import ExamenClinique from "./DossierMedical/ExamenClinique.js"
import ExamenComplementaire from "./DossierMedical/ExamenComplementaire.js"
import Hospitaliere from "./DossierMedical/Hospitaliere.js"
import Imagerie from "./DossierMedical/ImagerieModel.js"
import Prehospitaliere from "./DossierMedical/Prehospitaliere.js"
const Schema = mongoose.Schema;

const ChangementSchema = new mongoose.Schema({

    userId:  {
        type: Schema.Types.ObjectId,
        ref: 'Users',
        required: true,
      }, // ID de l'utilisateur qui a soumis la demande
   
     changesTypes: { type: [String] },   // Type de changement (ajout, modification, suppression)
     
    status: { type: String , enum: ["en attente", "approuvée", "rejetée"]},   // Statut de la demande (en attente, approuvée, rejetée)
    createdAt:{ type: Date} ,  // Date de création de la demande
    updatedAt: { type: Date} , // Date de mise à jour de la demande
    adminId: { type: String},  // ID de l'administrateur qui a traité la demande

    NewBiologie: { type: Schema.Types.Mixed},
    NewConclusionSortie: { type: Schema.Types.Mixed },
    NewDossier: { type: Schema.Types.Mixed},
    NewEvolutionClassification: { type: Schema.Types.Mixed },
    NewExamenClinique: { type: Schema.Types.Mixed },
    NewExamenComplementaire: { type: Schema.Types.Mixed },
    NewHospitaliere: { type: Schema.Types.Mixed },
    NewImagerie: { type: Schema.Types.Mixed },
    NewPrehospitaliere: { type: Schema.Types.Mixed },
    NewHospitaliere: { type: Schema.Types.Mixed },


    patient: {
        type: Schema.Types.ObjectId,
        ref: 'Patient',
        required: true,
    },

}, { timestamps: true });



export default mongoose.model("ChangementRequest", ChangementSchema);
