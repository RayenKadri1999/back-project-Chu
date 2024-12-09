import express from 'express';
//import { verifyToken } from '../../../utils/verifyUser.js';

import { verifyToken } from '../../../utils/verifyUser.js'; 

import { createASPECTS, deleteASPECTS, getASPECTSDetails, updateASPECTS } from '../../../controllers/dossier/imagerie/ASPECTSController.js';

const router = express.Router();


router.post('/create',[verifyToken], createASPECTS);
router.get('/getDetails/:id',[verifyToken], getASPECTSDetails);
router.post('/update/:id',[verifyToken], updateASPECTS);
router.delete('/delete/:id', [verifyToken], deleteASPECTS);  

export default router;