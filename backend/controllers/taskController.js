import mongoose from 'mongoose';
import Task from '../models/taskModel.js';

// GET all tasks
export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.status(200).json({ success: true, data: tasks });
  } catch (error) {
    console.log('Error in fetching tasks:', error.message);
    res.status(500).json({ success: false, message: 'Sever Error' });
  }
};

// CREATE task
export const createTask = async (req, res) => {
  const task = req.body; // user will send this data

  if (!task.description) {
    return res.status(400).json({ success: false, message: 'Please provide all fields' });
  }

  const newTask = new Task(task);

  try {
    await newTask.save();
    res.status(201).json({ success: true, data: newTask });
  } catch (error) {
    console.log('Error in creating task:', error.message);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};
