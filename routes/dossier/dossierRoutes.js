

import express from 'express';
//import { verifyToken } from '../../utils/verifyUser.js';

import { verifyToken } from '../../utils/verifyUser.js';       

import { createPatientDossiers,getPatientDossiersDetails,updatePatientDossiers } from '../../controllers/dossier/dossierController.js';


const router = express.Router();


router.post('/create',[verifyToken], createPatientDossiers);
router.get('/getDetails/:id',[verifyToken], getPatientDossiersDetails);
router.post('/update/:id',[verifyToken], updatePatientDossiers);


export default router;