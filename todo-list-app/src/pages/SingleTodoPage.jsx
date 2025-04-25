import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Todo from "../components/Todo";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import "./SingleTodoPage.css";

function SingleTodoPage({ token, userId }) {
  const [todo, setTodo] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(true);
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
        const response = await axios.get(`http://localhost:8080/user/${userId}/todo/${todoId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setTodo(response.data);
        setLoading(false);
      } catch (error) {
        console.error("An error occurred:", error);

        if (error.response && error.response.status === 404) {
          navigate("/user");
        } else {
          setErrorMessage("An error occurred while fetching the todo.");
          setLoading(false);
        }
      }
    };

    fetchTodo();
  }, [userId, todoId, navigate]);

  if (loading) {
    return (
      <div className="loading-container text-center">
        <div className="spinner-border text-primary" role="status"></div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <>
      <Navbar />
    <div className="single-todo-page container">
      <div className="todo-details card p-4 mt-4">
        <Todo userId={userId} todo={todo} onDelete={() => navigate("/user")} />
      </div>
    </div>
    <Footer />
    </>
  );
}

export default SingleTodoPage;
