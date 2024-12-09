import express from 'express';
//import { verifyToken } from '../../utils/verifyUser.js';

import { verifyToken } from '../../utils/verifyUser.js';       

import { createConclusionSortie, getConclusionSortieDetails, updateConclusionSortie } from '../../controllers/dossier/conclusionsortieController.js';




const router = express.Router();


router.post('/create',[verifyToken], createConclusionSortie);
router.get('/getDetails/:id',[verifyToken], getConclusionSortieDetails);
router.post('/update/:id',[verifyToken], updateConclusionSortie);


export default router;