const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Task title is required'],
    trim: true
  },
  description: {
    type: String,
    trim: true,
    default: ''
  },
  dueDate: {
    type: Date,
    required: [true, 'Due date is required']
  },
  priority: {
    type: String,
    lowercase:true,
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  },
  status: {
    type: String,
    lowercase:true,
    enum: ['pending', 'completed'],
    default: 'pending'
  }
}, { timestamps: true });

// Creating a model from the Task Schema
const Task = mongoose.model('Task',TaskSchema);

module.exports = Task