import express from 'express';
//import { verifyToken } from '../../../utils/verifyUser.js';

import { verifyToken } from '../../../utils/verifyUser.js'; 

import { createScanner, getScannerDetails, updateScanner } from '../../../controllers/dossier/imagerie/ScannerController.js';

const router = express.Router();


router.post('/create',[verifyToken], createScanner);
router.get('/getDetails/:id',[verifyToken], getScannerDetails);
router.post('/update/:id',[verifyToken], updateScanner);


export default router;