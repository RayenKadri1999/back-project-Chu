import express from 'express';
//import { verifyToken } from '../utils/verifyUser.js';

import { verifyToken } from '../utils/verifyUser.js';
import { ApprouveRequest, getAllRequestsHistory, NewRequest ,RejectRequest} from '../controllers/dossier/changementContoller.js';
import {authorizeRoles} from "../utils/authorizeRoles.js";

const router = express.Router();


router.post('/addrequest',[verifyToken], NewRequest);
 router.post('/approuve/:id',[ verifyToken,authorizeRoles('superUser','admin')], ApprouveRequest);
// router.delete('/delete/:id',[verifyToken],  deletePatient);
router.post('/reject/:id',[verifyToken,authorizeRoles('superUser','admin')], RejectRequest);
// router.get('/get/:id',[verifyToken], getPatient);
// router.get('/dossier/:id', getPatientDossiers);
router.get('/get', [verifyToken], getAllRequestsHistory);

export default router;