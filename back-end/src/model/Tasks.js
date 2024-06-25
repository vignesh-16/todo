const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  value: { type: String, required: true },
  isCompleted: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Task', taskSchema);