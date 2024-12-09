import express from 'express';
//import { verifyToken } from '../../../utils/verifyUser.js';

import { verifyToken } from '../../../utils/verifyUser.js'; 

import { createT2Swan, deleteT2Swan, getT2SwanDetails, updateT2Swan } from '../../../controllers/dossier/imagerie/T2SwanController.js';

const router = express.Router();


router.post('/create',[verifyToken], createT2Swan);
router.get('/getDetails/:id',[verifyToken], getT2SwanDetails);
router.post('/update/:id',[verifyToken], updateT2Swan);
router.delete('/delete/:id', [verifyToken], deleteT2Swan);  

export default router;