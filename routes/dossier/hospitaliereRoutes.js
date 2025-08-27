import express from 'express';
//import { verifyToken } from '../../utils/verifyUser.js';

import { verifyToken } from '../../utils/verifyUser.js';       
import { createHospitaliere, getHospitaliereDetails, updateHospitaliere } from '../../controllers/dossier/hospitaliereController.js';
import { authorizeRoles } from '../../utils/authorizeRoles.js';
// import { addCommentController, updateCommentHospitaliere } from '../../controllers/dossier/comment/commentController.js';



const router = express.Router();


router.post('/create',[verifyToken], createHospitaliere);
router.get('/getDetails/:id',[verifyToken], getHospitaliereDetails);
router.post('/update/:id',[verifyToken,authorizeRoles('admin')], updateHospitaliere);
// router.post('/addComment/:idHospitalisation',[verifyToken], addCommentHospitaliere);
// router.post("/updateComment/:idHospitalisation/:idComment",[verifyToken], updateCommentHospitaliere);


export default router;