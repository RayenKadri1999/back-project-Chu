import express from 'express';
import { verifyToken } from '../../utils/verifyUser.js';
import { authorizeRoles } from '../../utils/authorizeRoles.js';
import {
  createHospitaliere,
  getHospitaliereDetails,
  updateHospitaliere,
  deleteHospitaliere
} from '../../controllers/dossier/hospitaliereController.js';

const router = express.Router();

// Create
router.post('/', verifyToken, createHospitaliere);
// Read
router.get('/getDetails/:id', verifyToken, getHospitaliereDetails);
// Update
router.put('/:id', verifyToken, updateHospitaliere);
router.post('/update/:id', verifyToken, updateHospitaliere);
// Delete
router.delete('/:id', verifyToken, authorizeRoles('admin'), deleteHospitaliere);

export default router;