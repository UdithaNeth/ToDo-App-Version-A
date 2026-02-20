const express = require('express');
const router = express.Router();
const {
  createTodo,
  getAllTodos,
  getTodoById,
  updateTodo,
  deleteTodo
} = require('../controllers/todoController');

// Basic validation middleware placeholder
// TODO: Implement comprehensive validation using libraries like Joi or express-validator
const validateTodo = (req, res, next) => {
  // Placeholder: Check if title exists for POST and PUT requests
  if ((req.method === 'POST' || req.method === 'PUT') && !req.body.title) {
    return res.status(400).json({
      success: false,
      message: 'Title is required',
      data: null
    });
  }
  next();
};

// Routes
router.post('/', validateTodo, createTodo); // Create a new todo
router.get('/', getAllTodos); // Get all todos
router.get('/:id', getTodoById); // Get a todo by ID
router.put('/:id', validateTodo, updateTodo); // Update a todo by ID
router.delete('/:id', deleteTodo); // Delete a todo by ID

module.exports = router;