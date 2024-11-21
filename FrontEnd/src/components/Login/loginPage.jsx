import React, { useState } from "react";
import detailImage from "../../assets/detail-106.jpg"; // Going up 2 levels from the Login folder
import Dashboard from "../Dashboard/Dashboard"; // Import Dashboard component
import Signup from "../Signup/SingnupPage";
import "./loginpage.css";

function togglePassword(event) {
  const passwordField = document.getElementById("password");
  if (passwordField) {
    // Add this check
    if (passwordField.type === "password") {
      passwordField.type = "text";
      event.target.className = "toggle-password uil-eye";
    } else {
      passwordField.type = "password";
      event.target.className = "toggle-password uil-eye-slash";
    }
  }
}

//State for an Id;

const Loginpage = () => {
  const [userId, setUserId] = useState(0);
  const [Page, setPage] = useState("login");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState("aru701567@gmail.com");
  const [password, setPassword] = useState("Arunda95!");
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login state

  const toggleForm = () => {
    setPage(Page === "login" ? "signup" : "login");
  };

  const changecolor = (event) => {
    if (event.target.type === "email") {
      const emailIcon = document.querySelector(".uil");
      if (emailIcon) {
        setTimeout(() => {
          emailIcon.style.color = "white";
        }, 5000);
        emailIcon.style.color = "lightseagreen";
      }
    } else if (event.target.type === "password") {
      const lockIcon = document.getElementById("lock");
      if (lockIcon) {
        setTimeout(() => {
          lockIcon.style.color = "white";
        }, 5000);
        lockIcon.style.color = "lightseagreen";
      }
    }
  };

  const validate = (event) => {
    event.preventDefault();
    event.preventDefault();
    const emailInput = email.trim();
    const passwordInput = password.trim();

    if (!emailInput || !passwordInput) {
      alert("Please enter valid email and password.");
      return;
    }

    const getPersonData = async () => {
      const response = await fetch("http://localhost:8080/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      const data = await response.json();
      setUserId(data.id);
      if (data.id === undefined) alert("InValid UserName And Email");
      setIsLoggedIn(true);
    };
    getPersonData();
  };
  const togglePassword = () => {
    setPasswordVisible(!passwordVisible);
  };
  if (isLoggedIn && userId !== undefined) {
    return <Dashboard userid={userId} />;
  }

  return Page === "login" ? (
    <div className="login-page">
      <div className="login-container">
        {/* Left Section with Image */}
        <div className="login-left">
          <img
            src={detailImage}
            alt="Login Illustration"
            className="login-image"
          />
        </div>

        {/* Right Section with Form */}
        <div className="login-right">
          <h2>Welcome Back!</h2>
          <p>Login to continue exploring amazing features.</p>
          <form id="login-form">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp;
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                onInput={changecolor}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <br></br>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type={passwordVisible ? "text" : "password"}
                id="password"
                placeholder="Enter your password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
              />
              <span
                className="toggle-password"
                onClick={() => setPasswordVisible(!passwordVisible)}
                style={{
                  cursor: "pointer",
                  marginLeft: "430px",
                  marginTop: "-45px",
                }}
              >
                {passwordVisible ? "🙈" : "👁️"}
              </span>
            </div>
            <button type="submit" onClick={validate} className="login-btn">
              Login
            </button>
            &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp; &nbsp;
            &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp;&nbsp;
            &nbsp;&nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp;
            &nbsp;&nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;
            &nbsp;
            <button
              type="reset"
              onClick={() => {
                setEmail("");
                setPassword("");
              }}
              className="reset-btn"
            >
              Reset
            </button>
          </form>
          <p className="toggle-form">
            Not registered?{" "}
            <span
              onClick={toggleForm}
              style={{
                textDecoration: "underline",
                color: "green",
                cursor: "pointer",
                marginLeft: "120px",
                marginTop: "-30px",
                fontSize: "20px",
              }}
            >
              Register here
            </span>
          </p>
        </div>
      </div>
    </div>
  ) : (
    <Signup />
  );
};

export { Loginpage };
