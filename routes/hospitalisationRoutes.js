import express from 'express';
//import { verifyToken } from '../utils/verifyUser.js';
import { createHospitalisation, deleteHospitalisation, getHospitalisation, getHospitalisations, updateHospitalisation ,getHospitalisationDossiers} from '../controllers/hospitalisationController.js';
import { verifyToken } from '../utils/verifyUser.js';
import {authorizeRoles} from "../utils/authorizeRoles.js";

const router = express.Router();
 

router.post('/create',[verifyToken], createHospitalisation);

router.delete('/delete/:id',[ verifyToken,authorizeRoles('superUser','admin')],  deleteHospitalisation);
router.post('/update/:id',[ verifyToken,authorizeRoles('superUser','admin')], updateHospitalisation);
router.get('/getDetails/:id',[verifyToken], getHospitalisation);
router.get('/getAll/:idDossier', [verifyToken], getHospitalisations);

export default router; 