import express from 'express';
import { getTaskLists, createTaskList, updateTaskList, deleteTaskList } from '../controllers/taskListController.js';

const router = express.Router();

router.get('/tasklists', getTaskLists); // for testing
router.post('/tasklists', createTaskList);
router.put('/tasklists/:taskListId', updateTaskList);
router.delete('/tasklists/:taskListId', deleteTaskList);

export default router;
