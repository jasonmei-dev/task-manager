import mongoose from 'mongoose';
import asyncHandler from 'express-async-handler';
import Task from '../models/taskModel.js';
import TaskList from '../models/taskListModel.js';

// GET all tasks
export const getTasks = asyncHandler(async (req, res) => {
  const tasks = await Task.find({});
  res.status(200).json({ success: true, data: tasks });
});

// CREATE a task
export const createTask = asyncHandler(async (req, res) => {
  const { description, taskListId } = req.body;

  if (!description) {
    res.status(400);
    throw new Error('All fields required');
  }

  const newTask = await Task.create({
    description,
    taskList: taskListId,
  });

  await TaskList.findByIdAndUpdate(taskListId, { $push: { tasks: newTask._id } });

  res.status(201).json({ success: true, data: newTask });
});

// DELETE a task
export const deleteTask = asyncHandler(async (req, res) => {
  const { taskId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(taskId)) {
    res.status(404);
    throw new Error('Invalid task ID');
  }

  const task = await Task.findByIdAndDelete(taskId);

  if (!task) {
    res.status(404);
    throw new Error('Task not found');
  }

  // Remove taskId from TaskList's tasks array
  await TaskList.findByIdAndUpdate(task.taskList, { $pull: { tasks: taskId } });

  res.status(200).json({ success: true, message: 'Task deleted' });
});

// UPDATE a task
export const updateTask = asyncHandler(async (req, res) => {
  const { taskId } = req.params;
  const task = req.body;

  if (!mongoose.Types.ObjectId.isValid(taskId)) {
    res.status(404);
    throw new Error('Invalid task ID');
  }

  if (!task.description) {
    res.status(400);
    throw new Error('All fields required');
  }

  const updatedTask = await Task.findByIdAndUpdate(taskId, task, { new: true });
  res.status(200).json({ success: true, data: updatedTask });
});
