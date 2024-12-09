import express from 'express';
//import { verifyToken } from '../../../utils/verifyUser.js';

import { verifyToken } from '../../../utils/verifyUser.js'; 

import { createFatSat, deleteFatSat, getFatSatDetails, updateFatSat } from '../../../controllers/dossier/imagerie/FatSatController.js';

const router = express.Router();


router.post('/create',[verifyToken], createFatSat);
router.get('/getDetails/:id',[verifyToken], getFatSatDetails);
router.post('/update/:id',[verifyToken], updateFatSat);
router.delete('/delete/:id', [verifyToken], deleteFatSat);  

export default router;