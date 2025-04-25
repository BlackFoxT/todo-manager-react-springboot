import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

function ChangeTodoPage({ token, userId }) {
  const [todo, setTodo] = useState({
    title: "",
    description: "",
    completed: false,
    todoType: "Personal",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const { todoId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token || !userId) {
      navigate("/login");
    }
  }, [token, userId, navigate]);

  useEffect(() => {
    const fetchTodo = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/user/${userId}/todo/${todoId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setTodo({
          title: response.data.title,
          description: response.data.description,
          completed: response.data.completed,
          todoType: response.data.todoType,
        });
      } catch (error) {
        console.error("Error fetching todo data:", error);
        setErrorMessage("Failed to fetch todo data.");
      }
    };

    fetchTodo();
  }, [navigate, todoId, userId]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setTodo({
      ...todo,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSave = async () => {
    try {
      const updatedTodo = {
        ...todo,
        userId: userId,
        lastUpdated: new Date().toISOString(),
      };
      const response = await axios.put(
        `http://localhost:8080/user/${userId}/todo/${todoId}`,
        updatedTodo,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        navigate("/user");
      } else {
        setErrorMessage("Failed to update todo.");
      }
    } catch (error) {
      console.error("Error updating todo:", error);
      setErrorMessage("An error occurred while updating the todo.");
    }
  };

  const handleCancel = () => {
    navigate("/user");
  };

  return (
    <>
      <Navbar />
    <div className="container">

      <h2 className="mt-5">Edit Todo</h2>

      {errorMessage && <p className="alert alert-danger">{errorMessage}</p>}

      <div className="todo-form-container">
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={todo.title}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={todo.description}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="form-group form-check">
          <input
            type="checkbox"
            id="completed"
            name="completed"
            checked={todo.completed}
            onChange={handleChange}
            className="form-check-input"
          />
          <label htmlFor="completed" className="form-check-label">
            Completed
          </label>
        </div>

        <div className="form-group">
          <label htmlFor="todoType">Todo Type</label>
          <select
            id="todoType"
            name="todoType"
            value={todo.todoType}
            onChange={handleChange}
            className="form-control"
          >
            <option value="Personal">Personal</option>
            <option value="Work">Work</option>
            <option value="Shopping">Shopping</option>
            <option value="Health">Health</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="buttons">
          <button onClick={handleSave} className="btn btn-primary mr-2">
            Save Changes
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

export default ChangeTodoPage;
