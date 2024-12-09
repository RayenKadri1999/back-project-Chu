import express from 'express';
//import { verifyToken } from '../../utils/verifyUser.js';

import { verifyToken } from '../../utils/verifyUser.js';       

import { createExamensComplementaires, getExamensComplementairesDetails, updateExamensComplementairesClinique } from '../../controllers/dossier/examenscomplementaireController.js';




const router = express.Router();


router.post('/create',[verifyToken], createExamensComplementaires);
router.get('/getDetails/:id',[verifyToken], getExamensComplementairesDetails);
router.post('/update/:id',[verifyToken], updateExamensComplementairesClinique);


export default router;