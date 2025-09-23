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

// All routes require authentication
router.use(verifyToken);

// Create
router.post('/', createHospitaliere);
// Read
router.get('/:id', getHospitaliereDetails);
// Update
router.put('/:id', authorizeRoles('admin'), updateHospitaliere);
// Delete
router.delete('/:id', authorizeRoles('admin'), deleteHospitaliere);

export default router;