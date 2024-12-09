import express from 'express';
//import { verifyToken } from '../../utils/verifyUser.js';

import { verifyToken } from '../../utils/verifyUser.js';       
import { createImagerie, getImagerieDetails, updateImagerie } from '../../controllers/dossier/imagerieController.js';



const router = express.Router();


router.post('/create',[verifyToken], createImagerie);
router.get('/getDetails/:id',[verifyToken], getImagerieDetails);
router.post('/update/:id',[verifyToken], updateImagerie);


export default router;