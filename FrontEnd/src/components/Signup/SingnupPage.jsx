import "@iconscout/unicons/css/line.css";
import { useState } from "react";
import { Loginpage } from "../Login/loginPage";
import "../Login/loginpage.css";
import "./signup.css";

const Signup = () => {
  // State for Page Showing
  const [page, setPage] = useState("signup");

  // Dynamic form handling
  const [formData, setFormData] = useState({
    Firstname: "",
    Lastname: "",
    Email: "",
    password: "",
  });

  // Error message
  const [errorMessage, setErrorMessage] = useState("");

  // Changing the value
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

  // Name validation
  const nameValidator = (event) => {
    if (event.target.value.trim() === "")
      event.target.style.borderBottom = "2px solid red";
    else event.target.style.borderBottom = "2px solid blue";
  };

  // Password error handling
  const passwordErrorShow = (event) => {
    if (
      /\d/.test(event.target.value) &&
      /[A-Za-z]/.test(event.target.value) &&
      event.target.value.length >= 8
    )
      setErrorMessage("");
    else
      setErrorMessage(
        "Password must contain at least one digit, one uppercase and lowercase letter, and be at least 8 characters long."
      );
  };

  // Email validator
  const emailValidator = (event) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(event.target.value)) {
      event.target.style.borderBottom = "2px solid red";
      setErrorMessage("Invalid email format.");
    } else {
      event.target.style.borderBottom = "2px solid blue";
      setErrorMessage(""); // Clear any error messages related to the email field
    }
  };

  // Showing the password
  const eyeShow = (event) => {
    if (event.target.className === "uil uil-eye-slash") {
      document.getElementById("password").type = "text";
      event.target.className = "uil uil-eye";
    } else {
      document.getElementById("password").type = "password";
      event.target.className = "uil uil-eye-slash";
    }
  };

  // Form submission handler
  const GoToSignInPage = (event) => {
    event.preventDefault(); // Prevent form submission

    const { Firstname, Lastname, Email, password } = formData;

    if (
      !Firstname.trim() ||
      !Lastname.trim() ||
      !Email.trim() ||
      !password.trim()
    ) {
      alert("Please fill out all fields.");
      return;
    }

    // Validate email format before proceeding
    if (errorMessage) {
      alert("Please fix the errors in the form.");
      return;
    }
    const storePersonData = async () => {
      await fetch("http://localhost:8080/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstname: Firstname,
          lastname: Lastname,
          email: Email,
          password: password,
          username: Firstname + Lastname,
          phoneNumber: null,
        }),
      });
    };
    storePersonData();
    setPage(() => (page === "signup" ? "" : "signup"));
  };
  const uniconColor = (event) => {
    // Select the icon element inside the parent element
    const icon = event.target.parentElement.querySelector(".uil");

    if (icon) {
      icon.style.color = "blue";
      setTimeout(() => {
        icon.style.color = "black";
      }, 10000);
    }
  };
  return page === "signup" ? (
    <div className="signup_body">
      <div className="signup-container">
        <div className="image-container">
          <img
            src="https://www.kristen-mcclure-therapist.com/wp-content/uploads/2022/05/adhd-self-compassion-and-mindfulness.webp"
            alt="Signup"
            className="signup-image"
            style={{ height: "600px", width: "490px" }}
          />
        </div>
        <div className="form-container">
          <h1>Create Your Account</h1>
          <form onSubmit={GoToSignInPage}>
            <div className="input-group">
              <label htmlFor="Firstname">First Name</label>
              <input
                type="text"
                id="Firstname"
                placeholder="Enter First Name"
                onChange={changeValue}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="Lastname">Last Name</label>
              <input
                type="text"
                id="Lastname"
                placeholder="Enter Last Name"
                onChange={changeValue}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="Email">Email</label>
              <input
                type="email"
                id="Email"
                placeholder="Enter Email"
                onChange={changeValue}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Enter Password"
                onChange={changeValue}
                required
              />
              <i className="uil uil-eye-slash" onClick={eyeShow}>
                {" "}
              </i>
            </div>
            <p className="error-message">{errorMessage}</p>
            <button type="submit" className="submit-btn">
              Register
            </button>
          </form>
          <p>
            Already have an account?{" "}
            <button className="signin-btn" onClick={GoToSignInPage}>
              Sign In
            </button>
          </p>
        </div>
      </div>
    </div>
  ) : (
    <Loginpage formDatas={formData}></Loginpage>
  );
};
export default Signup;
