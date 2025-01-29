import express from 'express';
import { getTaskLists, createTaskList, updateTaskList, deleteTaskList } from '../controllers/taskListController.js';

const router = express.Router();

// GET all tasks
router.get('/', getTaskLists);
// CREATE a task
router.post('/', createTaskList);
// UPDATE a task
router.put('/:id', updateTaskList);
// DELETE a task
router.delete('/:id', deleteTaskList);

export default router;
