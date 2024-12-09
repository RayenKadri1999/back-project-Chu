import express from 'express';
//import { verifyToken } from '../../utils/verifyUser.js';

import { verifyToken } from '../../utils/verifyUser.js';

import { createConclusionSortieHematome, getConclusionSortieHematomeDetails, updateConclusionSortieHematome } from '../../controllers/dossier/conclusionSortieHematomeController.js';





const router = express.Router();


router.post('/create',[verifyToken], createConclusionSortieHematome);
router.get('/getDetails/:id',[verifyToken], getConclusionSortieHematomeDetails);
router.post('/update/:id',[verifyToken], updateConclusionSortieHematome);


export default router;