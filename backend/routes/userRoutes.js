import express from 'express';
import { getUsers, authUser, registerUser, logoutUser, getUserProfile, updateUserProfile, deleteUserProfile } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/users', getUsers); // for testing
router.post('/users', registerUser);
router.post('/users/auth', authUser);
router.post('/users/logout', logoutUser);
router.route('/users/profile').get(protect, getUserProfile).put(protect, updateUserProfile);
router.delete('/users/delete', protect, deleteUserProfile);

export default router;
