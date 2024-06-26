const express = require('express');
const user = express.Router();
const users = require('../model/Users');

// @route   GET users/getusers
// @desc    get all users
// @access  Public
user.get('/getusers', async(req, res)=>{
    try {
        const allUsers = await users.find();
        res.json(allUsers);
    } catch (err) {
        console.log('Error: while fetching users from db: ',err);
        return res.status(500).send('Server Error');
    }
});

// @route   POST users/adduser
// @desc    create a new user
// @access  Public
user.post('/adduser', (req,res)=>{
    try{
        console.log('for post: ',req.body);
        const { firstname, lastname, email, password } = req.body;
        const newUser = new users({ firstname, lastname, email, password });
        const userSaved = newUser.save();
        res.json(userSaved);
    } catch (err) {
        console.log('Error: while adding user to db: ',err);
        return res.status(500).send('Server Error');
    }
});

module.exports = user;