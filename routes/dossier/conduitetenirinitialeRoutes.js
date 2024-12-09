import express from 'express';
//import { verifyToken } from '../../utils/verifyUser.js';

import { verifyToken } from '../../utils/verifyUser.js';       

import { createConduiteTenirInitiale, getConduiteTenirInitialeDetails, updateConduiteTenirInitiale } from '../../controllers/dossier/conduitetenirinitialeController.js';




const router = express.Router();


router.post('/create',[verifyToken], createConduiteTenirInitiale);
router.get('/getDetails/:id',[verifyToken], getConduiteTenirInitialeDetails);
router.post('/update/:id',[verifyToken], updateConduiteTenirInitiale);


export default router;