import express from 'express';
//import { verifyToken } from '../../utils/verifyUser.js';
import { createprehospitaliere, getPrehospitaliereDetails, updatePrehospitaliere} from '../../controllers/dossier/prehospitaliereController.js';
import { verifyToken } from '../../utils/verifyUser.js';       



const router = express.Router();


router.post('/create',[verifyToken], createprehospitaliere);
router.get('/getDetails/:id',[verifyToken], getPrehospitaliereDetails);
router.post('/update/:id',[verifyToken], updatePrehospitaliere);


export default router;