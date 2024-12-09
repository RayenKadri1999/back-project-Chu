import express from 'express';
//import { verifyToken } from '../../../utils/verifyUser.js';

import { verifyToken } from '../../../utils/verifyUser.js'; 

import { createTSA, deleteTSA, getTSADetails, updateTSA } from '../../../controllers/dossier/imagerie/TSAController.js';

const router = express.Router();


router.post('/create',[verifyToken], createTSA);
router.get('/getDetails/:id',[verifyToken], getTSADetails);
router.post('/update/:id',[verifyToken], updateTSA);
router.delete('/delete/:id', [verifyToken], deleteTSA);  

export default router;