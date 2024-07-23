const mongoose = require('mongoose');
const schema = mongoose.Schema;

const usersSchema = new schema({
    email: {type: String, required: true},
    password: {type: String, required: true},
    firstname: {type: String, required: true},
    lastname: {type: String, required: false},
    admin: {type: Boolean, required: false, default: false}
},{ timestamps: true })

module.exports = mongoose.model('Users', usersSchema)