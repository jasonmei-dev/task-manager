import express from 'express';
import { getTasks, createTask, updateTask, deleteTask } from '../controllers/taskController.js';

const router = express.Router();

// GET all tasks
router.get('/', getTasks);
// CREATE a task
router.post('/', createTask);
// UPDATE a task
router.put('/:id', updateTask);
// DELETE a task
router.delete('/:id', deleteTask);

export default router;
