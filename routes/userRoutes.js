import express from 'express';
import { test,changePassword,updateUser,deleteUser,getUser, getAllUsers} from '../controllers/userControllers.js';
import {verifyToken} from "../utils/verifyUser.js";
import {authorizeRoles} from "../utils/authorizeRoles.js";
//import { verifyToken } from '../utils/verifyUser.js';


const router = express.Router();

router.get('/test', test);
router.post('/changePassword', changePassword);

router.post('/update/:id',  updateUser)
router.delete('/delete/:id', verifyToken,authorizeRoles('admin'), deleteUser)
router.get('/get', verifyToken,authorizeRoles('admin','superUser'), getAllUsers)
router.get('/:id', verifyToken,authorizeRoles('superUser','admin'),  getUser)

export default router;