const express = require('express');
const user = express.Router();
const users = require('../model/Users');
const documentId = require('shortid');

// @route   GET users/getusers
// @desc    get all users
// @access  Public
user.get('/getusers', async(req, res)=>{
    try {
        const allUsers = await users.find();
        res.json(allUsers);
    } catch (err) {
        console.log('Error: while fetching users from db: ',err);
        res.status(500).send('Server Error');
    }
});

// @route   POST users/adduser
// @desc    create a new user
// @access  Public
user.post('/adduser', async(req,res)=>{
    try{
        console.log('for post: ',req.body);
        let userExists = await users.find({  email : req.body.email })
        if (userExists?.[0]?.email) {
            return res.status(409).json({
                error: 'email already registered',
                message: 'The given email id has already been registered with another account'
            })
        }
        const { firstname, lastname, email, password } = req.body;
        const newUser = new users({ firstname, lastname, email, password });
        const userSaved = await newUser.save();
        let newAccount = await users.findOne({ email : req.body.email });
        res.json({
            queryResult: userSaved,
            userAccount: newAccount,
        });
    } catch (err) {
        console.log('Error: while adding user to db: ',err);
        res.status(500).send('Server Error');
    }
});

user.post('/isuser', async (req,res)=>{
    try {
        console.log('for post: ',req.body);
        let userEmail = req.body.emailId;
        let result = await users.findOne({ email : userEmail });
        res.json(result); 
    } catch (err) {
        console.log('Error: while searching for user:',err);
        res.status(500).send('Server Error')
    }
})

module.exports = user;