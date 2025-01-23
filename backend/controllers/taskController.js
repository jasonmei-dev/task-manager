import mongoose from 'mongoose';
import Task from '../models/taskModel.js';

// GET all tasks
export const getTasks = (req, res) => {
  res.status(200).json({ message: 'Get Tasks' });
};
