import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import userImage from "../images/user.png";

const Navbar = ({ onLogout }) => {
  const [dropdown, setDropdown] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:8080/auth/logout", null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
  
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };
  

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">
          ToDoList
        </Link>

        <div className="navbar-nav ms-auto">
          <div className="profile-dropdown position-relative" ref={dropdownRef}>
            <img
              src={userImage}
              alt="Profile"
              className="rounded-circle"
              style={{ width: "40px", height: "40px", cursor: "pointer" }}
              onClick={() => setDropdown(!dropdown)}
            />
            {dropdown && (
              <div
                className="dropdown-menu dropdown-menu-end show"
                style={{ position: "absolute", top: "100%", right: 0 }}
              >
                <Link to={`/user/profile`} className="dropdown-item">
                  Profile
                </Link>
                <button className="dropdown-item" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
