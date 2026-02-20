const mongoose = require('mongoose');
const Todo = require('../models/Todo');

/**
 * Create a new todo
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const createTodo = async (req, res) => {
  try {
    const todo = new Todo(req.body);
    await todo.save();
    res.status(201).json({
      success: true,
      message: 'Todo created successfully',
      data: todo
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
      data: null
    });
  }
};

/**
 * Get all todos
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getAllTodos = async (req, res) => {
  try {
    const todos = await Todo.find();
    res.status(200).json({
      success: true,
      message: 'Todos retrieved successfully',
      data: todos
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      data: null
    });
  }
};

/**
 * Get a todo by ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getTodoById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid todo ID',
        data: null
      });
    }
    const todo = await Todo.findById(id);
    if (!todo) {
      return res.status(404).json({
        success: false,
        message: 'Todo not found',
        data: null
      });
    }
    res.status(200).json({
      success: true,
      message: 'Todo retrieved successfully',
      data: todo
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      data: null
    });
  }
};

/**
 * Update a todo by ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid todo ID',
        data: null
      });
    }
    const todo = await Todo.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true
    });
    if (!todo) {
      return res.status(404).json({
        success: false,
        message: 'Todo not found',
        data: null
      });
    }
    res.status(200).json({
      success: true,
      message: 'Todo updated successfully',
      data: todo
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
      data: null
    });
  }
};

/**
 * Delete a todo by ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid todo ID',
        data: null
      });
    }
    const todo = await Todo.findByIdAndDelete(id);
    if (!todo) {
      return res.status(404).json({
        success: false,
        message: 'Todo not found',
        data: null
      });
    }
    res.status(200).json({
      success: true,
      message: 'Todo deleted successfully',
      data: null
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      data: null
    });
  }
};

module.exports = {
  createTodo,
  getAllTodos,
  getTodoById,
  updateTodo,
  deleteTodo
};