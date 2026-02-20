import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import './App.css';

const API_BASE_URL = 'http://localhost:5000/api/todos';

function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all todos
  const fetchTodos = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(API_BASE_URL);
      if (response.data.success) {
        setTodos(response.data.data);
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch todos');
    } finally {
      setLoading(false);
    }
  };

  // Add a new todo
  const addTodo = async (todoData) => {
    try {
      setError(null);
      const response = await axios.post(API_BASE_URL, todoData);
      if (response.data.success) {
        setTodos([...todos, response.data.data]);
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add todo');
    }
  };

  // Update a todo
  const updateTodo = async (id, updateData) => {
    try {
      setError(null);
      const response = await axios.put(`${API_BASE_URL}/${id}`, updateData);
      if (response.data.success) {
        setTodos(todos.map(todo =>
          todo._id === id ? response.data.data : todo
        ));
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update todo');
    }
  };

  // Delete a todo
  const deleteTodo = async (id) => {
    try {
      setError(null);
      const response = await axios.delete(`${API_BASE_URL}/${id}`);
      if (response.data.success) {
        setTodos(todos.filter(todo => todo._id !== id));
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete todo');
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="app">
      <h1>Todo App</h1>

      {loading && <div className="loading">Loading todos...</div>}
      {error && <div className="error">Error: {error}</div>}

      <TodoForm onAdd={addTodo} />

      <TodoList
        todos={todos}
        onUpdate={updateTodo}
        onDelete={deleteTodo}
      />
    </div>
  );
}

export default App;