import express from 'express';
//import { verifyToken } from '../../../utils/verifyUser.js';

import { verifyToken } from '../../../utils/verifyUser.js';

import { createTDM, getTDMDetails, updateTDM } from '../../../controllers/dossier/imagerie/TDMController.js';

const router = express.Router();


router.post('/create',[verifyToken], createTDM);
router.get('/getDetails/:id',[verifyToken], getTDMDetails);
router.post('/update/:id',[verifyToken], updateTDM);


export default router;