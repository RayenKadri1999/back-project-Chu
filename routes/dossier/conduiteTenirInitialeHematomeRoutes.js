import express from 'express';
//import { verifyToken } from '../../utils/verifyUser.js';

import { verifyToken } from '../../utils/verifyUser.js';

import {
    createConduiteTenirInitialeHematome, getConduiteTenirInitialeHematomeDetails,
    updateConduiteTenirInitialeHematome
} from "../../controllers/dossier/ConduiteTenirInitialeHematomeController.js";




const router = express.Router();


router.post('/create',[verifyToken], createConduiteTenirInitialeHematome);
router.get('/getDetails/:id',[verifyToken], getConduiteTenirInitialeHematomeDetails);
router.post('/update/:id',[verifyToken], updateConduiteTenirInitialeHematome);


export default router;