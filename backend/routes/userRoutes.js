import express from 'express';
import { getUsers, authUser, registerUser, logoutUser, getUserProfile, updateUserProfile } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/users', getUsers); // for testing
router.post('/users', registerUser);
router.post('/users/auth', authUser);
router.route('/users/profile').get(protect, getUserProfile).put(protect, updateUserProfile);
router.post('/users/logout', logoutUser);

export default router;
