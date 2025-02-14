import express from 'express';
//import { verifyToken } from '../../utils/verifyUser.js';

import { verifyToken } from '../../../utils/verifyUser.js';

import { createEtiologieHematome, getEtiologieHematomeDetails, updateEtiologieHematome } from '../../../controllers/dossier/etiologie/EtiologieHematomeController.js';

const router = express.Router();


router.post('/create',[verifyToken], createEtiologieHematome);
router.get('/getDetails/:id',[verifyToken], getEtiologieHematomeDetails);
router.post('/update/:id',[verifyToken], updateEtiologieHematome);


export default router;