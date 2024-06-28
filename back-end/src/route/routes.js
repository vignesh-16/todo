const express = require('express');
const router = express.Router();
const Task = require('../model/Tasks');

// @route   GET api/tasks
// @desc    Get all tasks
// @access  Public
router.get('/getTasks', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/tasks
// @desc    Add new task
// @access  Public
router.post('/addTask', async (req, res) => {
  try {
    const { value, isCompleted } = req.body;
    const newTask = new Task({ value, isCompleted });
    const task = await newTask.save();
    res.json(task);
  } catch (err) {
    console.error('Server Error: ',err);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/tasks
// @desc    Get completed tasks
// @access  Public
router.get('/getCompletedTasks', async (req, res) => {
  try {
    const tasks = await Task.find({ isCompleted : true });
    res.json(tasks);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;