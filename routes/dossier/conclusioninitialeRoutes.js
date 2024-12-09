import express from 'express';
//import { verifyToken } from '../../utils/verifyUser.js';

import { verifyToken } from '../../utils/verifyUser.js';       

import { createConclusionInitiale, getConclusionInitialeDetails, updateConclusionInitiale } from '../../controllers/dossier/conclusioninitialeController.js';




const router = express.Router();


router.post('/create',[verifyToken], createConclusionInitiale);
router.get('/getDetails/:id',[verifyToken], getConclusionInitialeDetails);
router.post('/update/:id',[verifyToken], updateConclusionInitiale);


export default router;