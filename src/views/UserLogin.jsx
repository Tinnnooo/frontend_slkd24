import React, { useState } from "react";
import { useStateContext } from "../contexts/ContextProvider";
import { Navigate, useNavigate } from "react-router-dom";
import axiosClient from "../axios";

const UserLogin = () => {
  const { userToken, currentUser, setCurrentUser, setToken } =
    useStateContext();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  if (userToken) {
    return <Navigate to="/" />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError("Please enter both username and password");
      return;
    }
    axiosClient
      .post("/login", {
        username,
        password,
      })
      .then((response) => {
        setToken(response.data.token);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        setError(err.response.data.message);
      });

    setError("");
  };

  const parentStyles = {
    width: "100%",
    height: "90vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const containerStyles = {
    margin: "auto auto",
    padding: "1rem",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    gap: "3rem",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    borderRadius: "8px",
  };

  const formStyles = {
    display: "flex",
    flexDirection: "column",
    gap: "1.5rem",
  };

  const inputStyles = {
    padding: "0.5rem",
    borderRadius: "4px",
    border: "1px solid #ccc",
    width: "20rem",
  };

  const buttonStyles = {
    backgroundColor: "#3b82f6",
    color: "#ffffff",
    padding: "0.75rem 1.5rem",
    borderRadius: "9999px",
    textDecoration: "none",
    display: "inline-block",
    transition: "background-color 0.3s",
    border: "none",
    cursor: "pointer",
  };

  const errorStyles = {
    color: "red",
    marginTop: "10px",
  };

  return (
    <div style={parentStyles}>
      <div style={containerStyles}>
        <h2 style={{ textAlign: "center" }}>User Login</h2>
        <form onSubmit={handleSubmit} style={formStyles}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={inputStyles}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={inputStyles}
          />
          <button type="submit" style={buttonStyles}>
            Login
          </button>
        </form>
        {error && <p style={errorStyles}>{error}</p>}
      </div>
    </div>
  );
};

export default UserLogin;
