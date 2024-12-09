import express from 'express';
//import { verifyToken } from '../utils/verifyUser.js';
import { createPatient, deletePatient, getPatient, getPatients, updatePatient ,getPatientDossiers} from '../controllers/patientController.js';
import { verifyToken } from '../utils/verifyUser.js';
import {authorizeRoles} from "../utils/authorizeRoles.js";

const router = express.Router();


router.post('/create',[verifyToken], createPatient);

router.delete('/delete/:id',[verifyToken,authorizeRoles(['superUser','admin'])],  deletePatient);
router.post('/update/:id',[verifyToken], updatePatient);
router.get('/getDetails/:id',[verifyToken], getPatient);
router.get('/get', [verifyToken], getPatients);

export default router;