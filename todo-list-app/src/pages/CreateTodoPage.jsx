import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./CreateTodoPage.css";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

function CreateTodoPage({ token, userId }) {
  const [todo, setTodo] = useState({
    title: "",
    description: "",
    completed: false,
    todoType: "Personal",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token || !userId) {
      navigate("/login");
    }
  }, [token, userId, navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setTodo({
      ...todo,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSave = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8080/user/${userId}/todo`,
        {
          ...todo,
          lastUpdated: new Date().toISOString(),
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        navigate("/user");
      }
       else {
        setErrorMessage(response.data.message || "Failed to create todo.");
      }
    } catch (error) {
      console.error("Error creating todo:", error);
      setErrorMessage("An error occurred while creating the todo.");
    }
  };

  const handleCancel = () => {
    navigate("/user");
  };

  return (
    <>
      <Navbar />
    <div className="create-todo-page container">
      <h2 className="text-center my-4">Create Todo</h2>

      {errorMessage && (
        <div className="alert alert-danger" role="alert">
          {errorMessage}
        </div>
      )}

      <div className="todo-form-container">
        <div className="form-group mb-3">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            className="form-control"
            value={todo.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group mb-3">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            className="form-control"
            value={todo.description}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group mb-3">
          <label htmlFor="completed">Completed</label>
          <input
            type="checkbox"
            id="completed"
            name="completed"
            checked={todo.completed}
            onChange={handleChange}
            className="form-check-input"
          />
        </div>

        <div className="form-group mb-3">
          <label htmlFor="todoType">Todo Type</label>
          <select
            id="todoType"
            name="todoType"
            value={todo.todoType}
            onChange={handleChange}
            className="form-select"
          >
            <option value="Personal">Personal</option>
            <option value="Work">Work</option>
            <option value="Shopping">Shopping</option>
            <option value="Health">Health</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="buttons d-flex justify-content-between">
          <button onClick={handleSave} className="btn btn-primary">
            Create Todo
          </button>
          <button onClick={handleCancel} className="btn btn-secondary">
            Cancel
          </button>
        </div>
      </div>

    </div>
    
    <Footer />
    </>
  );
}

export default CreateTodoPage;
