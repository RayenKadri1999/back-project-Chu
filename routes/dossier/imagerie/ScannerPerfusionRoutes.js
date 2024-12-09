import express from 'express';
//import { verifyToken } from '../../../utils/verifyUser.js';

import { verifyToken } from '../../../utils/verifyUser.js'; 

import { createScannerPerfusion, getScannerPerfusionDetails, updateScannerPerfusion } from '../../../controllers/dossier/imagerie/ScannerPerfusionController.js';

const router = express.Router();


router.post('/create',[verifyToken], createScannerPerfusion);
router.get('/getDetails/:id',[verifyToken], getScannerPerfusionDetails);
router.post('/update/:id',[verifyToken], updateScannerPerfusion);


export default router;