import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import "./ProfilePage.css";

function ProfilePage({ token, userId }) {
  const [user, setUser] = useState({ username: "" });
  const [originalUsername, setOriginalUsername] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token || !userId) {
      navigate("/login");
    }
  }, [token, userId, navigate]);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/user/${userId}/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser({ username: response.data.username });
        setOriginalUsername(response.data.username);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setErrorMessage("An error occurred while fetching user data.");
      }
    };

    fetchUserInfo();
  }, [token, userId]);

  useEffect(() => {
    if (errorMessage || successMessage) {
      const timer = setTimeout(() => {
        setErrorMessage("");
        setSuccessMessage("");
      }, 1500);
  
      return () => clearTimeout(timer);
    }
  }, [errorMessage, successMessage]);
  
  const handleChange = (e) => {
    setUser({
      ...user,
      username: e.target.value,
    });
  };

  const handleSave = async () => {
    if (user.username === originalUsername) {
      setErrorMessage("No changes detected.");
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:8080/user/${userId}/profile`,
        { username: user.username },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setSuccessMessage("Username updated successfully.");
        setOriginalUsername(user.username);
      } else {
        setErrorMessage("Failed to update username.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      console.error("Error details:", error.response || error.message || error);
      setErrorMessage("An error occurred while updating the profile.");
    }    
  };

  const handleCancel = () => {
    navigate("/user");
  };

  return (
    <>
      <Navbar />
    <div className="profile-page container">
      <div className="profile-container">
        <h2>Edit Profile</h2>

        {errorMessage && <p className="error alert alert-danger">{errorMessage}</p>}
        {successMessage && <p className="success alert alert-success">{successMessage}</p>}

        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={user.username}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <div className="buttons">
          <button className="btn btn-primary" onClick={handleSave}>
            Apply Change
          </button>
          <button className="btn btn-secondary" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>

    <Footer />
    </>
  );
}

export default ProfilePage;
