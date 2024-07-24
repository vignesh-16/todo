const express = require('express');
const user = express.Router();
const users = require('../model/Users');
const documentId = require('shortid');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const createToken = async(id)=>{
    let token = jwt.sign({ id }, process.env.SECRET_KEY, { expiresIn: '5d' });
    return token;
}

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
        console.log('to /adduser: ',req.body);
        let userExists = await users.find({  email : req.body.email })
        if (userExists?.[0]?.email) {
            return res.status(409).json({
                error: 'email already registered',
                message: 'The given email id has already been registered with another account'
            })
        }
        const { firstname, lastname, email, password } = req.body;
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt);
        const newUser = new users({ firstname, lastname, email, password: hash });
        const userSaved = await newUser.save();
        const token = await createToken(userSaved?._id);
        res.json({
            userAccount: userSaved,
            userToken: token
        });
    } catch (err) {
        console.log('Error: while adding user to db: ',err);
        res.status(500).send('Server Error');
    }
});

user.post('/isuser', async (req,res)=>{
    try {
        console.log('check /isuser: ',req.body);
        let userEmail = req.body.emailId;
        let result = await users.findOne({ email : userEmail });
        if(!result?.email) {
            console.info('No user found with the provided mail id: ');
            res.status(404).json({
                isUser: false,
                errType: 'User not found',
                message: 'Could not find any account which matches with the provided email id',
            })
        } else {
            res.status(200).json({
                isUser: true,
                message: 'Account with matching credentials found!',
                user: result
            })
        } 
    } catch (err) {
        console.log('Error: while searching for user:',err);
        res.status(500).send('Server Error')
    }
});

user.get('/isRegistered/:email',async(req,res)=>{
    try {
        let userEmail = req.params.email;
        let queryResult = await users.findOne({'email' : userEmail});
        let emailAlreadyRegistered = queryResult?.email ? true : false;
        res.status(200).json({
            isExists : emailAlreadyRegistered
        })
    } catch (err) {
        console.error('Error: could not complete email check:',err);
        res.status(500).json({
            isServerError : true,
            message: 'Could not complete the email check',
            error: err
        })
    }
})

user.post('/login', async(req,res)=>{
    try {
        const { email, password } = req.body;
        let profile = await users.findOne({ email : email });
        let match = bcrypt.compare(profile?.password, password);
        if(!match) {
            res.status(401).json({
                isAuthenticated: false,
                message: 'Provided password is not valid!',
            })
        }
        const token = await createToken(profile?._id);
        res.status(200).json({
            isAuthenticated: true,
            _id: profile?._id,
            userToken: token
        })
    } catch (err) {
        res.status(500).json({
            isAuthenticated: false,
            message: 'Could not validate user password',
            error: err
        })
    }
})

module.exports = user;