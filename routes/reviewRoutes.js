import express from 'express';

import { verifyToken } from '../utils/verifyUser.js';
// import {authorizeRoles} from "../utils/authorizeRoles.js";
import { getTabsState } from '../controllers/reviewController.js';
import { updateTabState } from '../controllers/reviewController.js';
const router = express.Router();
import { addCommentController, updateCommentController, deleteCommentController } from '../controllers/dossier/comment/commentController.js';


export const allowedEntities = [
  "ConclusionSortie",
  "ConduiteTenirInitialeHematome",
  "EvolutionClassification",
  "Prehospitaliere",
  "ConduiteTenirInitiale",
  "ExamensComplementaires",
  "EtiologieHematome",
  "NIHSS",
  "ConclusionInitiale",
  "ExamensComplementairesHematome",
  "Biologie",
  "ConclusionInitialeHematome",
  "ExamenClinique",
  "EvolutionClassificationHematome",
  "ConclusionSortieHematome",
  "Initial",
  "Hospitaliere",
  "Imagerie",
  "HospitaliereHematome",
  "ExamenCliniqueHematome",
  "BiologieHematome"
];

const verifyEntity = (req, res, next) => {
  const { model } = req.params;
  if (!allowedEntities.includes(model)) {
    return res.status(400).json({ success: false, message: "Invalid entity" });
  }
  next();
};

//add a comment to an Entity
router.post("/:model/:idEntity/comments", verifyToken, verifyEntity, (req, res, next) =>
  addCommentController(req.params.model, req, res, next)
);

// Update a comment
router.put("/:model/:idEntity/comments/:commentId", verifyToken, verifyEntity, (req, res, next) =>
  updateCommentController(req.params.model, req, res, next)
);

// Delete a comment
router.delete("/:model/:idEntity/comments/:commentId", verifyToken, verifyEntity, (req, res, next) =>
  deleteCommentController(req.params.model, req, res, next)
);

router.get('/tabStates/:matricule',[verifyToken], getTabsState);

router.put(
  "/:model/:idEntity/reviewInfo/state",
  verifyToken,
  verifyEntity,
  updateTabState
);



export default router;