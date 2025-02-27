import mongoose from 'mongoose';
import asyncHandler from 'express-async-handler';
import TaskList from '../models/taskListModel.js';
import Task from '../models/taskModel.js';
import User from '../models/userModel.js';

// GET all task lists (for testing)
export const getTaskLists = asyncHandler(async (req, res) => {
  const taskLists = await TaskList.find({});
  res.status(200).json({ success: true, data: taskLists });
});

// @desc Create a task list
// @route POST /api/tasklists
// @access Private
export const createTaskList = asyncHandler(async (req, res) => {
  const { name, userId } = req.body;

  if (!name) {
    res.status(400);
    throw new Error('Task list name is required');
  }

  const newTaskList = await TaskList.create({ name, user: userId });

  await User.findByIdAndUpdate(userId, { $push: { taskLists: newTaskList._id } });
  res.status(201).json({ success: true, data: newTaskList });
});

// @desc Delete a task list
// @route DELETE /api/tasklists/:taskListId
// @access Private
export const deleteTaskList = asyncHandler(async (req, res) => {
  const { taskListId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(taskListId)) {
    res.status(404);
    throw new Error('Invalid task list ID');
  }

  const taskList = await TaskList.findByIdAndDelete(taskListId);

  if (!taskList) {
    res.status(404);
    throw new Error('Task list not found');
  }

  // Delete all tasks inside the task list
  await Task.deleteMany({ taskList: taskListId });

  // Remove taskLisId from User's taskLists array
  await User.findByIdAndUpdate(taskList.user, { $pull: { taskLists: taskListId } });

  res.status(200).json({ success: true, message: 'Task list deleted and tasks automatically deleted' });
});

// @desc Update a task list
// @route PUT /api/tasklists/:taskListId
// @access Private
export const updateTaskList = asyncHandler(async (req, res) => {
  const { taskListId } = req.params;
  const taskList = req.body;

  if (!mongoose.Types.ObjectId.isValid(taskListId)) {
    res.status(404);
    throw new Error('Invalid task list ID');
  }

  if (!taskList.name) {
    res.status(400);
    throw new Error('Task list name is required');
  }

  const updatedTaskList = await TaskList.findByIdAndUpdate(taskListId, taskList, { new: true });

  res.status(200).json({ success: true, data: updatedTaskList });
});

// @desc Get user tasklists
// @route GET /api/users/:userId/tasklists
// @access Private
export const getUserTaskLists = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  const taskLists = await TaskList.find({ user: userId }).populate('tasks');

  res.status(200).json({ success: true, data: taskLists });
});
