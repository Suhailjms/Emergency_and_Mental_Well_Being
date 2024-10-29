import { useState } from "react";
import axios from "axios";
import Signup from "../Signup/SignUp";
// import Dashboard from "../Dashboard/Dashboard";
import { useNavigate } from 'react-router-dom';
import "./loginpage.css";

function togglePassword(event) {
  const passwordField = document.getElementById("password");
  if (passwordField) {
    if (passwordField.type === "password") {
      passwordField.type = "text";
      event.target.className = "toggle-password uil-eye";
    } else {
      passwordField.type = "password";
      event.target.className = "toggle-password uil-eye-slash";
    }
  }
}
// var token;

const Loginpage = () => {
  const [page, setPage] = useState("login");
  const [error, setError] = useState(""); // Track login error
  const navigate = useNavigate();

  const toggleForm = () => {
    setPage(page === "login" ? "signup" : "login");
  };

  const changecolor = (event) => {
    const icon = event.target.type === "email" ? ".uil-envelope" : "#lock";
    const iconElement = document.querySelector(icon);
    if (iconElement) {
      setTimeout(() => {
        iconElement.style.color = "white";
      }, 5000);
      iconElement.style.color = "blueviolet";
    }
  };

  const validate = async (event) => {
    event.preventDefault();

    const email = document.getElementById("email");
    const password = document.getElementById("password");

    if (email && password) {
      const loginRequest = {
        email: email.value,
        password: password.value,
      };

      try {
        const response = await axios.post('http://localhost:8080/api/login', loginRequest);
        if (response.status === 200) {
          // console.log("Login successful:", response);
          // token = response.data.token;
          
            alert("Login Successful");
            // setPage("Dashboard");
          navigate('/dashboard'); // Navigate to Dashboard
        } else {
          setError(response.data.message || "Invalid credentials");
        }
      } catch (error) {
        setError("Invalid credentials");
        // console.error("Login error:", error);
      }
    }
  };

  // Render login or signup form based on the current page state
  return page === "login" ? (
    <div
      style={{
        fontFamily: "'Roboto', sans-serif",
        backgroundSize: "cover",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        margin: 0,
        color: "white",
        backgroundColor: "black",
      }}
    >
      <div>
        {/* <Dashboard token = {token} /> */}
      </div>
      <div className="container">
        <h2>Login</h2>
        {error && <p style={{ color: "red" }}>{error}</p>} {/* Display error message */}
        <form id="login-form" onSubmit={validate}>
          <i className="uil uil-envelope email"></i>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" onInput={changecolor} required />

          <label htmlFor="password">Password</label>
          <i className="uil uil-lock pwd" id="lock"></i>
          <div className="password-container">
            <input
              type="password"
              id="password"
              className="password"
              onChange={changecolor}
              required
            />
            <span
              className="toggle-password uil-eye-slash"
              onClick={togglePassword}
            ></span>
          </div>

          <button type="submit">Login</button>
          <button type="reset">Reset</button>
        </form>
        <span className="registerLink">Not Yet Registered? </span>
        <a href="#" className="toggle-link" onClick={toggleForm}>
          Register here
        </a>
      </div>
    </div>
  ) : (
    <Signup />
  );
};

export default Loginpage;
