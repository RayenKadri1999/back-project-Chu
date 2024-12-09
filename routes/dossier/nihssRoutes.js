import express from 'express';
//import { verifyToken } from '../../utils/verifyUser.js';

import { verifyToken } from '../../utils/verifyUser.js';       
import { createNihss, deleteNihss, getAllNihss, getNihssDetails, updateNihss } from '../../controllers/dossier/nihssController.js';



const router = express.Router();


router.post('/create',[verifyToken], createNihss);
router.get('/getDetails/:id',[verifyToken], getNihssDetails);
router.get('/get/:id',[verifyToken], getAllNihss);
router.delete('/delete/:id',[verifyToken],  deleteNihss);
router.post('/update/:id',[verifyToken], updateNihss);


export default router;