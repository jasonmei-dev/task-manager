import express from 'express';
import { getTaskLists, createTaskList, updateTaskList, deleteTaskList } from '../controllers/taskListController.js';

const router = express.Router();

router.get('/', getTaskLists);
router.post('/', createTaskList);
router.put('/:id', updateTaskList);
router.delete('/:id', deleteTaskList);

export default router;
