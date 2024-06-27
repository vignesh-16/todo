const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const Tasks = require('./model/Tasks');
const Users = require('./model/Users');

dotenv.config();
const app = express();
const port = process.env.port || 3001;

app.use(cors());
app.use(express.json());

console.log(process.env.MONGODB_URI)

mongoose.connect(process.env.MONGODB_URI)
.then(()=>{
    console.log('Connected to Mongodb!!!');
})
.catch((err)=> {
    console.log('Error: could not connect to mongo client: ',err);
})

// Routes
const generalRoutes = require('./route/routes');
app.use('/api/tasks/', generalRoutes);

const userRoutes = require('./route/users');
app.use('/users/', userRoutes);

app.listen(port, ()=>{ 
    console.log('App running successfully!');
    console.log('App listening on port: ',port);
});