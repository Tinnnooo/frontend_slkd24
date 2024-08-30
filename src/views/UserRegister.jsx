import React, { useState, useEffect } from "react";
import { useStateContext } from "../contexts/ContextProvider";
import { Navigate, useNavigate } from "react-router-dom";
import axiosClient from "../axios";

const UserRegister = () => {
  const { userToken, setToken } = useStateContext();
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const [captchaToken, setCaptchaToken] = useState("");
  const [captchaInput, setCaptchaInput] = useState("");
  const [captchaImage, setCaptchaImage] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    generateCaptchaToken();
  }, []);

  if (userToken) {
    return <Navigate to="/" />;
  }

  const handleProfilePictureChange = (e) => {
    setProfilePicture(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !name ||
      !username ||
      !password ||
      !confirmPassword ||
      !email ||
      !dateOfBirth ||
      !phoneNumber ||
      !profilePicture ||
      !captchaInput
    ) {
      setError("Please fill in all fields and complete CAPTCHA.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Password not match.");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("date_of_birth", dateOfBirth);
    formData.append("phone_number", phoneNumber);
    formData.append("profile_picture", profilePicture);
    formData.append("captcha", captchaInput);
    formData.append("token", captchaToken);

    axiosClient
      .post("/registration", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
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

  const generateCaptchaToken = () => {
    axiosClient
      .get("/captcha/requestToken")
      .then((response) => {
        setCaptchaToken(response.data.token);
        generateCaptcha(response.data.token);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const generateCaptcha = (token) => {
    axiosClient
      .get(`/captcha/${token}`, {
        responseType: "arraybuffer",
      })
      .then((response) => {
        const base64Image = arrayBufferToBase64(response.data);
        const imageSrc = `data:image/png;base64,${base64Image}`;
        setCaptchaImage(imageSrc);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const arrayBufferToBase64 = (buffer) => {
    let binary = "";
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  };

  const refreshCaptcha = () => {
    generateCaptchaToken(); // Regenerate token and CAPTCHA image
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

  const inputGroupStyle = {
    display: "flex",
    gap: "1rem",
  };

  const captchaContainer = {
    display: "flex",
    flexDirection: "column",
  };

  const errorStyles = {
    color: "red",
    marginTop: "10px",
  };

  return (
    <div style={parentStyles}>
      <div style={containerStyles}>
        <h2 style={{ textAlign: "center" }}>User Register</h2>
        <form onSubmit={handleSubmit} style={formStyles}>
          <div style={inputGroupStyle}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={inputStyles}
            />
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={inputStyles}
            />
          </div>

          <div style={inputGroupStyle}>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={inputStyles}
            />
            <input
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              style={inputStyles}
            />
          </div>

          <div style={inputGroupStyle}>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={inputStyles}
            />
            <input
              type="date"
              placeholder="Date of Birth"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
              style={inputStyles}
            />
          </div>

          <div style={inputGroupStyle}>
            <input
              type="text"
              placeholder="Phone Number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              style={inputStyles}
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleProfilePictureChange}
              style={inputStyles}
            />
          </div>

          <div style={captchaContainer}>
            <div>
              <img
                src={captchaImage}
                alt="CAPTCHA"
                style={{ marginBottom: "0.5rem", width: "20%" }}
              />
            </div>

            <div style={inputGroupStyle}>
              <input
                type="text"
                placeholder="Enter CAPTCHA"
                value={captchaInput}
                onChange={(e) => setCaptchaInput(e.target.value)}
                style={inputStyles}
              />
              <button
                type="button"
                onClick={refreshCaptcha}
                style={buttonStyles}
              >
                Refresh CAPTCHA
              </button>
            </div>
          </div>
          <button type="submit" style={buttonStyles}>
            Register
          </button>
        </form>
        {error && <p style={errorStyles}>{error}</p>}
      </div>
    </div>
  );
};

export default UserRegister;
