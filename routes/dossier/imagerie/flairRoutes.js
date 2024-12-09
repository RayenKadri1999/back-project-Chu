import express from 'express';
//import { verifyToken } from '../../../utils/verifyUser.js';

import { verifyToken } from '../../../utils/verifyUser.js'; 

import { createFlair, deleteFlair, getFlairDetails, updateFlair } from '../../../controllers/dossier/imagerie/flairController.js';

const router = express.Router();


router.post('/create',[verifyToken], createFlair);
router.get('/getDetails/:id',[verifyToken], getFlairDetails);
router.post('/update/:id',[verifyToken], updateFlair);
router.delete('/delete/:id', [verifyToken], deleteFlair);  

export default router;