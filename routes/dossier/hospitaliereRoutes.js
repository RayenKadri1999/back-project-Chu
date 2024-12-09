import express from 'express';
//import { verifyToken } from '../../utils/verifyUser.js';

import { verifyToken } from '../../utils/verifyUser.js';       
import { createHospitaliere, getHospitaliereDetails, updateHospitaliere } from '../../controllers/dossier/hospitaliereController.js';
import { authorizeRoles } from '../../utils/authorizeRoles.js';



const router = express.Router();


router.post('/create',[verifyToken], createHospitaliere);
router.get('/getDetails/:id',[verifyToken], getHospitaliereDetails);
router.post('/update/:id',[verifyToken,authorizeRoles('admin')], updateHospitaliere);


export default router;