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
  const { email, password } = req.body;

  try {
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
      res.status(401).json({ success: false, message: 'Invalid email or password' });
    }
  } catch (error) {
    console.log('Error in authorizing user:', error.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// @desc Register a new user
// @route POST /api/users
// @access Public
export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ success: false, message: 'All fields required' });
  }

  const userExists = await User.findOne({ email });

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
      res.status(201).json({
        success: true,
        data: {
          _id: user._id,
          name: user.name,
          email: user.email,
        },
      });
    } else {
      res.status(400).json({ success: false, message: 'Invalid user data' });
    }
  } catch (error) {
    console.log('Error registering user:', error.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// @desc Logout user
// @route POST /api/users/logout
// @access Public
export const logoutUser = async (req, res) => {
  try {
    res.cookie('jwt', '', {
      httpOnly: true,
      expires: new Date(0),
    });

    res.status(200).json({ success: true, message: 'User logged out' });
  } catch (error) {
    console.log('Error logging out user:', error.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// @desc Get user profile
// @route GET /api/users/profile
// @access Private
export const getUserProfile = async (req, res) => {
  const user = {
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email,
    taskLists: req.user.taskLists,
  };

  res.status(200).json({ success: true, data: user });
};

// @desc Update user profile
// @route PUT /api/users/profile
// @access Private
export const updateUserProfile = async (req, res) => {
  try {
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
    }
  } catch (error) {
    console.log('Error updating user:', error.message);
    res.status(404).json({ success: false, message: 'User not found' });
  }
};
