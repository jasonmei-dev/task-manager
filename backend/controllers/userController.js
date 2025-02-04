import express from 'express';
import generateToken from '../utils/generateToken.js';
import User from '../models/userModel.js';
import TaskList from '../models/taskListModel.js';

// GET all users (for testing)
export const getUsers = async (req, res) => {
  try {
    const users = await User.find().populate('taskLists');
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    console.log('Error in fetching users:', error.message);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// @desc Auth user/set token
// @route POST /api/users/auth
// @access Public
export const authUser = async (req, res) => {
  res.status(200).json({ message: 'Auth User' });
};

// @desc Register a new user
// @route POST /api/users
// @access Public
export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (!name || !email || !password) {
    return res.status(400).json({ success: false, message: 'All fields required' });
  }

  if (userExists) {
    return res.status(400).json({ success: false, message: 'User already exists' });
  }

  try {
    const user = await User.create({
      name,
      email,
      password,
    });

    if (user) {
      generateToken(res, user._id);
      return res.status(201).json({ success: true, data: user });
    }
  } catch (error) {
    console.log('Error registering user:', error.message);
    res.status(400).json({ success: false, message: 'Invalid user data' });
  }
};

// @desc Logout user
// @route POST /api/users/logout
// @access Public
export const logoutUser = async (req, res) => {
  res.status(200).json({ message: 'User logged out' });
};

// @desc Get user profile
// @route GET /api/users/profile
// @access Private
export const getUserProfile = async (req, res) => {
  res.status(200).json({ message: 'User profile' });
};

// @desc Update user profile
// @route PUT /api/users/profile
// @access Private
export const updateUserProfile = async (req, res) => {
  res.status(200).json({ message: 'Update user profile' });
};
