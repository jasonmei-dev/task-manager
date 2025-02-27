import express from 'express';
import { getTasks, createTask, updateTask, deleteTask } from '../controllers/taskController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/tasks', getTasks); // for testing
router.post('/tasks', protect, createTask);
router.put('/tasks/:taskId', protect, updateTask);
router.delete('/tasks/:taskId', protect, deleteTask);

export default router;
