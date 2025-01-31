import express from 'express';
import { authUser, getUsers, registerUser } from '../controllers/userController.js';

const router = express.Router();

router.post('/auth', authUser);
router.get('/', getUsers);
router.post('/', registerUser);

export default router;
