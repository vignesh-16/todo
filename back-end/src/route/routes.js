const express = require('express');
const router = express.Router();
const Task = require('../model/Tasks');

// @route   GET api/tasks/getTasks
// @desc    Get pending tasks
// @access  Public
router.get('/getTasks', async (req, res) => {
  try {
    const tasks = await Task.find({ isCompleted : false });
    res.json(tasks);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/tasks/addTask
// @desc    Add new task
// @access  Public
router.post('/addTask', async (req, res) => {
  try {
    const { _id, value, isCompleted } = req.body;
    const newTask = new Task({ _id, value, isCompleted });
    const task = await newTask.save();
    res.json(task);
  } catch (err) {
    console.error('Server Error: ',err);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/tasks/getCompletedTasks
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

// @route   PUT api/tasks/markCompleted
// @desc    Mark tasks (in bulk) as completed
// @access  Public
router.put('/markCompleted',(req, res)=>{
  try {
    let isUpdated = {};
    req.body.forEach(async(task) =>{
      isUpdated = await Task.updateOne( { _id : task._id }, { 
        'isCompleted' : task.isCompleted
       } );
    })
    res.json(isUpdated)
  } catch (err) {
    console.log('Error while updating tasks: ',err);
    res.status(500).send('Server Error')
  }
})

router.delete('/delete/:id', async(req,res)=>{
  try {
    let requestId = req.params.id
    console.log('Delete request for Id: ',requestId);
    let target = await Task.findById({ _id : requestId }, {_id : 1, value: 1});
    console.log('Target task: ', target?.schema?.obj);
    let deleteOperattion = await Task.findByIdAndDelete({  _id : requestId });
    console.log('Delete status: ', deleteOperattion);
  } catch (err) {
    console.log('Error while deleting document: ',err);
    res.status(500).send('Server Error')
  }
})

// @route   GET api/tasks/getCompletedTasks
// @desc    Get all completed tasks
// @access  Public
router.get('/getCompletedTasks', async(req, res)=>{
  try {
    const tasks = await Task.find({ isCompleted : false });
    res.json(tasks).message('Successfully fetched completed tasks!');
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
})

module.exports = router;