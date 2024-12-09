import express from 'express';
//import { verifyToken } from '../../utils/verifyUser.js';

import { verifyToken } from '../../utils/verifyUser.js';       

import { createEvolutionClassification, getEvolutionClassificationDetails, updateEvolutionClassification } from '../../controllers/dossier/evolutionClassificationController.js';

const router = express.Router();


router.post('/create',[verifyToken], createEvolutionClassification);
router.get('/getDetails/:id',[verifyToken], getEvolutionClassificationDetails);
router.post('/update/:id',[verifyToken], updateEvolutionClassification);


export default router;