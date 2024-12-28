import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

interface Todo {
  _id: string;
  title: string;
  description: string;
  dueDate?: string;  // New field for due date
  completed: boolean;
}

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState({ title: '', description: '', dueDate: '' });
  const [editTodo, setEditTodo] = useState<Partial<Todo> | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const response = await axios.get<Todo[]>('http://localhost:3000/todos');
    setTodos(response.data);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (editTodo) {
      setEditTodo({
        ...editTodo,
        [name]: value,
      });
    } else {
      setNewTodo({
        ...newTodo,
        [name]: value,
      });
    }
  };

  const addTodo = async () => {
    await axios.post('http://localhost:3000/todos', newTodo);
    setNewTodo({ title: '', description: '', dueDate: '' });
    setSuccessMessage('Todo added successfully!');
    fetchTodos();
    hideSuccessMessage();
  };

  const updateTodo = async () => {
    if (editTodo && editTodo._id) {
      await axios.put(`http://localhost:3000/todos/${editTodo._id}`, editTodo);
      setEditTodo(null);
      setSuccessMessage('Todo updated successfully!');
      fetchTodos();
      hideSuccessMessage();
    }
  };

  const deleteTodo = async (id: string) => {
    await axios.delete(`http://localhost:3000/todos/${id}`);
    setSuccessMessage('Todo deleted successfully!');
    fetchTodos();
    hideSuccessMessage();
  };

  const setTodoForEdit = (todo: Todo) => {
    setEditTodo(todo);
  };

  const hideSuccessMessage = () => {
    setTimeout(() => {
      setSuccessMessage(null);
    }, 3000);
  };

  return (
    <div className="container">
      <h1 className="title">Todo List</h1>

      {/* Success Message */}
      {successMessage && (
        <div className="success-message">
          {successMessage}
        </div>
      )}

      <ul className="todo-list">
        {todos.map((todo) => (
          <li key={todo._id} className="todo-item">
            {editTodo && editTodo._id === todo._id ? (
              <div className="edit-section">
                <input
                  name="title"
                  value={editTodo.title || ''}
                  onChange={handleInputChange}
                  placeholder="Edit Title"
                  className="input"
                />
                <input
                  name="description"
                  value={editTodo.description || ''}
                  onChange={handleInputChange}
                  placeholder="Edit Description"
                  className="input"
                />
                <input
                  type="date"
                  name="dueDate"
                  value={editTodo.dueDate || ''}
                  onChange={handleInputChange}
                  className="input"
                />
                <button className="button save-button" onClick={updateTodo}>Save</button>
              </div>
            ) : (
              <div className="todo-content">
                <div className="todo-details">
                  <strong>{todo.title}</strong> - {todo.description}
                  {todo.dueDate && <div className="todo-due-date">Due: {new Date(todo.dueDate).toLocaleDateString()}</div>}
                </div>
                <div className="todo-actions">
                  <button className="button edit-button" onClick={() => setTodoForEdit(todo)}>Edit</button>
                  <button className="button delete-button" onClick={() => deleteTodo(todo._id)}>Delete</button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>

      <div className="add-section">
        <h2>{editTodo ? 'Edit Todo' : 'Add Todo'}</h2>
        <input
          name="title"
          value={editTodo ? editTodo.title || '' : newTodo.title}
          onChange={handleInputChange}
          placeholder="Title"
          className="input"
        />
        <input
          name="description"
          value={editTodo ? editTodo.description || '' : newTodo.description}
          onChange={handleInputChange}
          placeholder="Description"
          className="input"
        />
        <input
          type="date"
          name="dueDate"
          value={editTodo ? editTodo.dueDate || '' : newTodo.dueDate}
          onChange={handleInputChange}
          className="input"
        />
        <button className="button add-button" onClick={editTodo ? updateTodo : addTodo}>
          {editTodo ? 'Update Todo' : 'Add Todo'}
        </button>
      </div>
    </div>
  );
};

export default App;
