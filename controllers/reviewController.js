import ConclusionSortie from "../models/DossierMedical/ConclusionSortie.js";
import ConduiteTenirInitialeHematome from "../models/DossierMedical/ConduiteTenirInitialeHematome.js";
import EvolutionClassification from "../models/DossierMedical/EvolutionClassification.js";
import Prehospitaliere from "../models/DossierMedical/Prehospitaliere.js";
import ConduiteTenirInitiale from "../models/DossierMedical/ConduiteTenirInitiale.js";
import ExamensComplementaires from "../models/DossierMedical/ExamenComplementaire.js";
import EtiologieHematome from "../models/DossierMedical/etiologie/Etiologie_hematome.js";
import NIHSS from "../models/DossierMedical/Nihss.js";
import ConclusionInitiale from "../models/DossierMedical/ConclusionInitiale.js";
import ExamensComplementairesHematome from "../models/DossierMedical/ExamenComplementaireHematome.js";
import Biologie from "../models/DossierMedical/Biologie.js";
import ConclusionInitialeHematome from "../models/DossierMedical/ConclusionInitialeHematome.js";
import ExamenClinique from "../models/DossierMedical/ExamenClinique.js";
import EvolutionClassificationHematome from "../models/DossierMedical/EvolutionClassificationHematome.js";
import ConclusionSortieHematome from "../models/DossierMedical/ConclusionSortieHematome.js";
import Initial from "../models/DossierMedical/InitialModel.js";
import Hospitaliere from "../models/DossierMedical/Hospitaliere.js";
import Imagerie from "../models/DossierMedical/ImagerieModel.js";
import HospitaliereHematome from "../models/DossierMedical/HospitaliereHematome.js";
import ExamenCliniqueHematome from "../models/DossierMedical/ExamenCliniqueHematome.js";
import BiologieHematome from "../models/DossierMedical/BiologieHematome.js";

const models = {
    ConclusionSortie,
    ConduiteTenirInitialeHematome,
    EvolutionClassification,
    Prehospitaliere,
    ConduiteTenirInitiale,
    ExamensComplementaires,
    EtiologieHematome,
    NIHSS,
    ConclusionInitiale,
    ExamensComplementairesHematome,
    Biologie,
    ConclusionInitialeHematome,
    ExamenClinique,
    EvolutionClassificationHematome,
    ConclusionSortieHematome,
    Initial,
    Hospitaliere,
    Imagerie,
    HospitaliereHematome,
    ExamenCliniqueHematome,
    BiologieHematome,
};

export async function getTabsState(req, res, next) {
    try {
        const { matricule } = req.params;

        const results = [];

        for (const [name, Model] of Object.entries(models)) {
            const doc = await Model.findOne({ matricule })
                .select("reviewInfo")
                .lean();
            if (doc) {
                results.push({
                    tab: name,
                    //   status: doc.reviewInfo.status ?? "no status field",
                    status: doc.reviewInfo.status ?? "no status field",
                });
            } else {
                results.push({
                    tab: name,
                    status: "Empty",
                });
            }
        }
        console.log(results);
        res.json(results);
    } catch (err) {
        next(err);
    }
}

export async function updateTabState(req, res, next) {
    try {
        const { model, idEntity } = req.params;
        const { status } = req.body;

        const Model = models[model];
        if (!Model) {
            return res
                .status(400)
                .json({ success: false, message: "Invalid model" });
        }

        // Make sure status is valid according to BaseTabSchema
        const validStatuses = ["En cours", "Accepté", "refusé", "A refaire"];
        if (!validStatuses.includes(status)) {
            return res
                .status(400)
                .json({ success: false, message: "Invalid status value" });
        }

        const updatedDoc = await Model.findByIdAndUpdate(
            idEntity,
            {
                $set: {
                    "reviewInfo.status": status,
                    "reviewInfo.reviewedBy":  req.userId, // fallback to current user
                    "reviewInfo.lastReviewedAt": new Date(),
                },
            },
            { new: true }
        ).select("reviewInfo");

        console.log("userId used in review status update:" , req.userId);

        if (!updatedDoc) {
            return res
                .status(404)
                .json({ success: false, message: "Entity not found" });
        }

        res.json({ success: true, reviewInfo: updatedDoc.reviewInfo });
    } catch (err) {
        next(err);
    }
}
