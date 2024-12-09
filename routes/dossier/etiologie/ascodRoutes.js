import express from 'express';
//import { verifyToken } from '../../../utils/verifyUser.js';

import { verifyToken } from '../../../utils/verifyUser.js'; 

import { createASCOD, getASCODDetails, updateASCOD } from '../../../controllers/dossier/etiologie/ascodController.js';

const router = express.Router();


router.post('/create',[verifyToken], createASCOD);
router.get('/getDetails/:id',[verifyToken], getASCODDetails);
router.post('/update/:id',[verifyToken], updateASCOD);


export default router;