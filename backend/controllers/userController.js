import express from 'express';
import User from '../models/userModel.js';
import TaskList from '../models/taskListModel.js';

export const authUser = async (req, res) => {
  res.status(200).json({ message: 'Auth User' });
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.find().populate('taskLists');
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    console.log('Error in fetching users:', error.message);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

export const registerUser = async (req, res) => {
  const user = req.body;

  if (!user.name || !user.email || !user.password) {
    return res.status(400).json({ success: false, message: 'Please provide all fields' });
  }

  const newUser = new User(user);

  try {
    await newUser.save();
    res.status(201).json({ success: true, data: newUser });
  } catch (error) {
    console.log('Error in creating user:', error.message);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};
