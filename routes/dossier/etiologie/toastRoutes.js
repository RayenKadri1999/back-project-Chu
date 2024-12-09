import express from 'express';
//import { verifyToken } from '../../../utils/verifyUser.js';

import { verifyToken } from '../../../utils/verifyUser.js'; 

import { createTOAST, getTOASTDetails, updateTOAST } from '../../../controllers/dossier/etiologie/toastController.js';

const router = express.Router();


router.post('/create',[verifyToken], createTOAST);
router.get('/getDetails/:id',[verifyToken], getTOASTDetails);
router.post('/update/:id',[verifyToken], updateTOAST);


export default router;