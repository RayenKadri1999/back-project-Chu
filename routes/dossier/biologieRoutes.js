import express from 'express';
//import { verifyToken } from '../../utils/verifyUser.js';

import { verifyToken } from '../../utils/verifyUser.js';       
import { createBiologie, getBiologieDetails, updateBiologie } from '../../controllers/dossier/biologieController.js';




const router = express.Router();


router.post('/create',[verifyToken], createBiologie);
router.get('/getDetails/:id',[verifyToken], getBiologieDetails);
router.post('/update/:id',[verifyToken], updateBiologie);


export default router;