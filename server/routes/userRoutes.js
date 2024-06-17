import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { updateUser, getAllUsers, getUserById } from '../controllers/userController.js';

const router = express.Router();

router.post('/update/:id', updateUser)
router.get('/getAllUsers', getAllUsers);
router.get('/getUserById/:id', getUserById);

export default router;