import "@iconscout/unicons/css/line.css";
import { useState } from "react";
import axios from 'axios';
import  Loginpage  from "../Login/loginPage";
import "../Login/loginpage.css";
import "./signup.css";

const Signup = () => {
  const [page, setPage] = useState("signup");
  const [formData, setFormData] = useState({
    Firstname: "",
    Lastname: "",
    Email: "",
    password: "",
    username: "",
    phoneNumber: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const changeValue = (event) => {
    setFormData((prevData) => ({
      ...prevData,
      [event.target.id]: event.target.value,
    }));

    if (event.target.type === "password") passwordErrorShow(event);
    if (event.target.type === "text") nameValidator(event);
    if (event.target.type === "email") emailValidator(event);
    uniconColor(event);
  };

  const nameValidator = (event) => {
    event.target.style.borderBottom = event.target.value.trim() === "" ? "2px solid red" : "2px solid blue";
  };

  const passwordErrorShow = (event) => {
    const password = event.target.value;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasDigit = /\d/.test(password);
    const isValidLength = password.length >= 8;

    if (hasUpperCase && hasLowerCase && hasDigit && isValidLength) {
      setErrorMessage(""); // Clear the error message
    } else {
      setErrorMessage("Password must contain at least one digit, one uppercase letter, one lowercase letter, and be at least 8 characters long.");
    }
  };

  const emailValidator = (event) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(event.target.value)) {
      event.target.style.borderBottom = "2px solid red";
      setErrorMessage("Invalid email format.");
    } else {
      event.target.style.borderBottom = "2px solid blue";
      setErrorMessage("");
    }
  };

  const eyeShow = (event) => {
    const passwordField = document.getElementById("password");
    if (event.target.className === "uil uil-eye-slash") {
      passwordField.type = "text";
      event.target.className = "uil uil-eye";
    } else {
      passwordField.type = "password";
      event.target.className = "uil uil-eye-slash";
    }
  };

  const GoToSignInPage = async (event) => {
    event.preventDefault();

    const { Firstname, Lastname, Email, password, username, phoneNumber } = formData;

    if (!Firstname || !Lastname || !Email || !password || !username || !phoneNumber) {
      alert("Please fill out all fields.");
      return;
    }

    if (errorMessage) {
      alert("Please fix the errors in the form.");
      return;
    }

    const requestBody = {
      firstname: Firstname,
      lastname: Lastname,
      username: username,
      email: Email,
      password: password,
      phoneNumber: phoneNumber,
    };

    console.log("Request Body:", requestBody);

    try {
      const response = await axios.post('http://localhost:8080/api/register', requestBody);
      // console.log("Response Data:", response.data);
      alert("Signup successful! You can now log in.");
      setPage("login");
    } catch (error) {
      if (error.response) {
        console.error("Error Response Data:", error.response.data);
        alert(error.response.data.message || "Signup failed. Please try again.");
      } else {
        console.error("Error during signup:", error);
        alert("An error occurred. Please try again later.");
      }
    }
  };

  const uniconColor = (event) => {
    setTimeout(
      () => (event.target.parentElement.querySelector(".uil").style.color = "black"),
      10000
    );
    event.target.parentElement.querySelector(".uil").style.color = "blue";
  };

  return page === "signup" ? (
    <>
      <div className="signupbody">
        <h1>Create Your Account</h1>
        <div className="signupform_Page">
          <form onSubmit={GoToSignInPage}>
            <div className="signupinput_field">
              <i className="uil uil-user"></i>
              <label htmlFor="Firstname">First Name</label>
              <input
                type="text"
                id="Firstname"
                placeholder="Enter The First Name"
                onChange={changeValue}
                required
              />
            </div>
            <div className="signupinput_field">
              <i className="uil uil-user"></i>
              <label htmlFor="Lastname">Last Name</label>
              <input
                type="text"
                id="Lastname"
                placeholder="Enter The Last Name"
                onChange={changeValue}
                required
              />
            </div>
            <div className="signupinput_field">
              <i className="uil uil-envelope"></i>
              <label htmlFor="Email">Email</label>
              <mark className="requiredEmail">*</mark>
              <input
                type="email"
                id="Email"
                placeholder="Enter The Email"
                onChange={changeValue}
                required
              />
            </div>
            <div className="signupinput_field">
              <i className="uil uil-lock"></i>
              <label htmlFor="password">Password</label>
              <mark className="requiredPassword">*</mark>
              <input
                type="password"
                id="password"
                placeholder="Enter the Password"
                onChange={changeValue}
                required
              />
              <i className="uil uil-eye-slash" onClick={eyeShow} style={{ cursor: "pointer" }}></i>
            </div>
            <div className="signupinput_field">
              <i className="uil uil-user"></i>
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                placeholder="Enter Your Username"
                onChange={changeValue}
                required
              />
            </div>
            <div className="signupinput_field">
              <i className="uil uil-phone"></i>
              <label htmlFor="phoneNumber">Phone Number</label>
              <input
                type="text"
                id="phoneNumber"
                placeholder="Enter Your Phone Number"
                onChange={changeValue}
                required
              />
            </div>
            <p className="signuperrorShow">{errorMessage}</p>
            <div className="signupinput_field">
              <input type="submit" value="Register" />
              <br />
              Already Registered?
              <button
                style={{ backgroundColor: "transparent", border: "none", color: "blue", cursor: "pointer" }}
                onClick={() => setPage("login")}
              >
                Signin
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  ) : (
    <Loginpage formDatas={formData} />
  );
};

export default Signup;
