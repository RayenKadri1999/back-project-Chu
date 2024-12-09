import express from 'express';
//import { verifyToken } from '../../utils/verifyUser.js';

import { verifyToken } from '../../utils/verifyUser.js';       

import { createExamenClinique, getExamenCliniqueDetails, updateExamenClinique } from '../../controllers/dossier/examencliniqueController.js';




const router = express.Router();


router.post('/create',[verifyToken], createExamenClinique);
router.get('/getDetails/:id',[verifyToken], getExamenCliniqueDetails);
router.post('/update/:id',[verifyToken], updateExamenClinique);


export default router;