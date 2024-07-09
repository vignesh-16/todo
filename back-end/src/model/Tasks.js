const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  value: { type: String, required: true },
  isCompleted: { type: Boolean, default: false },
  isSelected: { type: Boolean, default: false },
  byUser:{ type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Task', taskSchema);