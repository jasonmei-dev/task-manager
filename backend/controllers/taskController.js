import mongoose from 'mongoose';
import Task from '../models/taskModel.js';
import TaskList from '../models/taskListModel.js';

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

// CREATE a task
export const createTask = async (req, res) => {
  const { description, taskListId } = req.body;

  if (!description) {
    return res.status(400).json({ success: false, message: 'Please provide all fields' });
  }
  try {
    const newTask = await Task.create({
      description,
      taskList: taskListId,
    });

    await TaskList.findByIdAndUpdate(taskListId, { $push: { tasks: newTask._id } });

    res.status(201).json({ success: true, data: newTask });
  } catch (error) {
    console.log('Error in creating task:', error.message);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// UPDATE a task
export const updateTask = async (req, res) => {
  const { id } = req.params;
  const task = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: 'Invalid task ID' });
  }

  if (!task.description) {
    return res.status(400).json({ success: false, message: 'Please provide all fields' });
  }

  try {
    const updatedTask = await Task.findByIdAndUpdate(id, task, { new: true });
    res.status(200).json({ success: true, data: updatedTask });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// DELETE a task
export const deleteTask = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: 'Invalid task ID' });
  }

  try {
    await Task.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: 'Task deleted' });
  } catch (error) {
    console.log('Error in deleting task:', error.message);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};
