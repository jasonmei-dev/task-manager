import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToken.js';
import User from '../models/userModel.js';
import TaskList from '../models/taskListModel.js';
import Task from '../models/taskModel.js';

// GET all users (for testing)
export const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find().populate('taskLists');
  res.status(200).json({ success: true, data: users });
});

// @desc Auth user & set token
// @route POST /api/users/auth
// @access Public
export const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);
    res.status(201).json({
      success: true,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

// @desc Register a new user
// @route POST /api/users
// @access Public
export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const userExists = await User.findOne({ email });

  if (!name || !email || !password) {
    res.status(400);
    throw new Error('All fields required');
  }

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    generateToken(res, user._id);
    res.status(201).json({
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// @desc Logout user
// @route POST /api/users/logout
// @access Public
export const logoutUser = asyncHandler(async (req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({ success: true, message: 'User logged out' });
});

// @desc Get user profile
// @route GET /api/users/profile
// @access Private
export const getUserProfile = asyncHandler(async (req, res) => {
  const user = {
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email,
    taskLists: req.user.taskLists,
  };

  res.status(200).json({ success: true, data: user });
});

// @desc Update user profile
// @route PUT /api/users/profile
// @access Private
export const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.status(200).json({
      success: true,
      data: {
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
      },
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc Delete user profile
// @route DELETE /api/users/:userId
// @access Private
export const deleteUserProfile = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const taskLists = await TaskList.find({ user: userId });
  const taskListIds = taskLists.map((taskList) => taskList._id);

  // Delete all tasks belonging to user's task lists
  await Task.deleteMany({ taskList: { $in: taskListIds } });

  // Delete all task lists belonging to the user
  await TaskList.deleteMany({ user: userId });

  // Delete the user
  await User.findByIdAndDelete(userId);

  // Clear JWT and logout the user
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({ success: true, message: 'User deleted successfully' });
});
