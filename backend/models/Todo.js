const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  // Title of the todo item, required, trimmed, minimum 3 characters
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 3
  },
  // Optional description of the todo
  description: {
    type: String,
    required: false
  },
  // Status indicating if the todo is completed, default false
  status: {
    type: Boolean,
    default: false
  },
  // Priority level, enum values, default medium
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  },
  // Creation timestamp, default to current date
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Todo', todoSchema);