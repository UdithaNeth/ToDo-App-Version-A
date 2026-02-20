import React, { useState } from 'react';

const TodoItem = ({ todo, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [editDescription, setEditDescription] = useState(todo.description);
  const [editPriority, setEditPriority] = useState(todo.priority);

  const handleSave = () => {
    onUpdate(todo._id, {
      title: editTitle.trim(),
      description: editDescription.trim(),
      priority: editPriority
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditTitle(todo.title);
    setEditDescription(todo.description);
    setEditPriority(todo.priority);
    setIsEditing(false);
  };

  const handleToggleComplete = () => {
    onUpdate(todo._id, { status: !todo.status });
  };

  return (
    <div className={`todo-item ${todo.status ? 'completed' : ''}`}>
      {isEditing ? (
        <div className="edit-form">
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
          />
          <textarea
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            rows="2"
          />
          <select
            value={editPriority}
            onChange={(e) => setEditPriority(e.target.value)}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <div className="edit-buttons">
            <button onClick={handleSave}>Save</button>
            <button onClick={handleCancel}>Cancel</button>
          </div>
        </div>
      ) : (
        <div className="todo-content">
          <div className="todo-header">
            <h3>{todo.title}</h3>
            <span className={`priority ${todo.priority}`}>{todo.priority}</span>
          </div>
          {todo.description && <p>{todo.description}</p>}
          <div className="todo-actions">
            <button onClick={handleToggleComplete}>
              {todo.status ? 'Mark Incomplete' : 'Mark Complete'}
            </button>
            <button onClick={() => setIsEditing(true)}>Edit</button>
            <button onClick={() => onDelete(todo._id)}>Delete</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoItem;