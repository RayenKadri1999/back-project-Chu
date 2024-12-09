import express from 'express';
//import { verifyToken } from '../../../utils/verifyUser.js';

import { verifyToken } from '../../../utils/verifyUser.js'; 

import { createTofWillis, deleteTofWillis, getTofWillisDetails, updateTofWillis} from '../../../controllers/dossier/imagerie/TofWillisController.js';

const router = express.Router();


router.post('/create',[verifyToken], createTofWillis);
router.get('/getDetails/:id',[verifyToken], getTofWillisDetails);
router.post('/update/:id',[verifyToken], updateTofWillis);

router.delete('/delete/:id', [verifyToken], deleteTofWillis);  
export default router;