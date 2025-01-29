import mongoose from 'mongoose';
import TaskList from '../models/taskModel.js';

// GET all task lists
export const getTaskLists = async (req, res) => {
  try {
    const taskLists = await TaskList.find({});
    res.status(200).json({ success: true, data: taskLists });
  } catch (error) {
    console.log('Error in fetching tasks:', error.message);
    res.status(500).json({ success: false, message: 'Sever Error' });
  }
};

// CREATE a task list
export const createTaskList = async (req, res) => {
  const taskList = req.body; // user will send this data

  if (!taskList.name) {
    return res.status(400).json({ success: false, message: 'Please provide all fields' });
  }

  const newTaskList = new TaskList(taskList);

  try {
    await newTaskList.save();
    res.status(201).json({ success: true, data: newTaskList });
  } catch (error) {
    console.log('Error in creating task list:', error.message);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// UPDATE a task list
export const updateTaskList = async (req, res) => {
  const { id } = req.params;
  const taskList = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: 'Invalid TaskList ID' });
  }

  if (!taskList.name) {
    return res.status(400).json({ success: false, message: 'Please provide all fields' });
  }

  try {
    const updatedTaskList = await TaskList.findByIdAndUpdate(id, task, { new: true });
    res.status(200).json({ success: true, data: updatedTaskList });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// DELETE a task list
export const deleteTaskList = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: 'Invalid task list ID' });
  }

  try {
    await TaskList.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: 'TaskList deleted' });
  } catch (error) {
    console.log('Error in deleting task:', error.message);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};
