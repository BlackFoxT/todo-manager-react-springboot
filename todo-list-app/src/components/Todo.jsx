import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Todo.css";

function Todo({ userId, todo, onDelete }) {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const getTodoTypeClass = (type) => {
    switch (type) {
      case "Personal": return "bg-primary text-white";
      case "Work": return "bg-success text-white";
      case "Shopping": return "bg-warning text-dark";
      case "Health": return "bg-danger text-white";
      case "Other": return "bg-info text-white";
      default: return "";
    }
  };

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      const response = await axios.delete(`http://localhost:8080/user/${userId}/todo/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.status === 200) {
        onDelete(id);
      }
    } catch (error) {
      console.error("Error deleting todo:", error);
    } finally {
      setLoading(false);
    }
  };

  const onEdit = (id) => {
    navigate(`/user/todo/${id}/edit`);
  };

  const handleView = (id) => {
    navigate(`/user/todo/${id}`);
  };

  return (
    <div className={`todo-card card ${getTodoTypeClass(todo.todoType)} mb-3`}>
      <div className="card-body">
        <h5 className="card-title">{todo.title}</h5>
        <p className="card-text">{todo.description}</p>

        <div className="todo-status mb-3">
          {todo.completed ? (
            <span className="badge bg-success">✔ Completed</span>
          ) : (
            <span className="badge bg-danger">❌ Not Completed</span>
          )}
        </div>

        <div className="todo-actions">
          <button className="btn btn-info me-2" onClick={() => handleView(todo.id)}>
            View
          </button>
          <button className="btn btn-warning me-2" onClick={() => onEdit(todo.id)}>
            Edit
          </button>
          <button 
            className="btn btn-danger" 
            onClick={() => handleDelete(todo.id)} 
            disabled={loading}
          >
            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Todo;
