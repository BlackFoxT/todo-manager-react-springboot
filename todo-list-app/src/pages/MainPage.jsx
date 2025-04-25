import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Todo from "../components/Todo";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

function MainPage({ token, userId }) {
  const [todos, setTodos] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!token || !userId) {
      navigate("/login");
    }
  }, [token, userId, navigate]);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/user/${userId}/todo`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTodos(response.data);
      } catch (error) {
        console.error("An error occurred:", error);
        setErrorMessage("An error occurred while fetching todos.");
      }
    };

    fetchTodos();
  }, [userId]);

  const handleDelete = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };
  
  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <div className="todo-list card p-4">
          <h2 className="text-center mb-4">Your Todos</h2>
          <button
            className="btn btn-primary mb-3"
            onClick={() => navigate(`/user/todo/create`)}
          >
            + Create Todo
          </button>

          {errorMessage && <p className="text-danger">{errorMessage}</p>}

          {todos.length === 0 ? (
            <p>No todos found.</p>
          ) : (
            <div className="row">
              {todos.map((todo) => (
                <div className="col-md-4 mb-3" key={todo.id}>
                  <Todo userId={userId} todo={todo} onDelete={handleDelete} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default MainPage;
