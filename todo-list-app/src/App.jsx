import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import MainPage from "./pages/MainPage";
import ProfilePage from "./pages/ProfilePage";
import CreateTodoPage from "./pages/CreateTodoPage";
import ChangeTodoPage from "./pages/ChangeTodoPage";
import SingleTodoPage from "./pages/SingleTodoPage";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [userId, setUserId] = useState(localStorage.getItem("userId"));
  
  const location = useLocation();

  useEffect(() => {
    setToken(localStorage.getItem("token"));
    setUserId(localStorage.getItem("userId"));
  }, [location]);

  return (
    <>
      <Routes>
        <Route path="/login" element={token ? <Navigate to="/user" /> : <LoginPage />}/>
        <Route path="/signup" element={token ? <Navigate to="/user" /> : <SignupPage />}/>
        <Route path="/user" element={<MainPage token={token} userId={userId} />} />
        <Route path="/user/profile" element={<ProfilePage token={token} userId={userId} />} />
        <Route path="/user/todo/create" element={<CreateTodoPage token={token} userId={userId} />} />
        <Route path="/user/todo/:todoId/edit" element={<ChangeTodoPage token={token} userId={userId} />} />
        <Route path="/user/todo/:todoId" element={<SingleTodoPage token={token} userId={userId} />} />
        <Route path="/" element={token ? <Navigate to="/user" /> : <Navigate to="/login" />} />
        <Route path="*" element={<h2>404 - Not Found</h2>} />
      </Routes>
    </>
  );
}

export default function AppWithRouter() {
  return (
    <Router>
      <App />
    </Router>
  );
}
