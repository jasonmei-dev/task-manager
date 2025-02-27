import express from 'express';
import { getTaskLists, createTaskList, updateTaskList, deleteTaskList, getUserTaskLists } from '../controllers/taskListController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/tasklists', getTaskLists); // for testing
router.post('/tasklists', protect, createTaskList);
router.put('/tasklists/:taskListId', protect, updateTaskList);
router.delete('/tasklists/:taskListId', protect, deleteTaskList);
router.get('/users/:userId/tasklists', protect, getUserTaskLists);

export default router;
