import express from 'express';
//import { verifyToken } from '../../../utils/verifyUser.js';

import { verifyToken } from '../../../utils/verifyUser.js'; 

import { createIRMCérébrale, getIRMCérébraleDetails, updateIRMCérébrale} from '../../../controllers/dossier/imagerie/IRMCérébraleController.js';

const router = express.Router();


router.post('/create',[verifyToken], createIRMCérébrale);
router.get('/getDetails/:id',[verifyToken], getIRMCérébraleDetails);
router.post('/update/:id',[verifyToken], updateIRMCérébrale);


export default router;