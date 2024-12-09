import express from 'express';
//import { verifyToken } from '../../../utils/verifyUser.js';

import { verifyToken } from '../../../utils/verifyUser.js'; 

import { createSequencePerfusion, deleteSequencePerfusion, getSequencePerfusionDetails, updateSequencePerfusion } from '../../../controllers/dossier/imagerie/SequencePerfusionController.js';

const router = express.Router();


router.post('/create',[verifyToken], createSequencePerfusion);
router.get('/getDetails/:id',[verifyToken], getSequencePerfusionDetails);
router.post('/update/:id',[verifyToken], updateSequencePerfusion);
router.delete('/delete/:id', [verifyToken], deleteSequencePerfusion);  


export default router;