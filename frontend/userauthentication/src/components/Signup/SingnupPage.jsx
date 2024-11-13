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
    Username: "",
    PhoneNumber: "",
    Email: "",
    Password: "",
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
      document.getElementById("Password").type = "text";
      event.target.className = "uil uil-eye";
    } else {
      document.getElementById("Password").type = "password";
      event.target.className = "uil uil-eye-slash";
    }
  };

  // Form submission handler
  const GoToSignInPage = (event) => {
    event.preventDefault(); // Prevent form submission

    const { Firstname, Lastname, Username, PhoneNumber, Email, Password } =
      formData;

    if (
      !Firstname.trim() ||
      !Lastname.trim() ||
      !Username.trim() ||
      !PhoneNumber.trim() ||
      !Email.trim() ||
      !Password.trim()
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
          username: Username,
          phoneNumber: PhoneNumber,
          email: Email,
          password: Password,
        }),
      });
    };
    storePersonData();
    setPage(() => (page === "signup" ? "" : "signup"));
  };

  // Color changing for Unicons
  const uniconColor = (event) => {
    setTimeout(
      () =>
        (event.target.parentElement.querySelector(".uil").style.color =
          "black"),
      10000
    );
    event.target.parentElement.querySelector(".uil").style.color = "blue";
  };

  // Conditional rendering to switch between login and signup pages
  return page === "signup" ? (
    <>
      <div className="signupbody">
        <h1>Create Your Account</h1>
        <br />
        <div className="signupform_Page">
          <form onSubmit={GoToSignInPage}>
            <div className="signupinput_field">
              <i className="uil uil-user"></i>
              <label htmlFor="Firstname">First Name</label>
              <br />
              <input
                type="text"
                id="Firstname"
                placeholder="Enter Your First Name"
                onChange={changeValue}
                required
              />
            </div>
            <div className="signupinput_field">
              <i className="uil uil-user"></i>
              <label htmlFor="Lastname">Last Name</label>
              <br />
              <input
                type="text"
                id="Lastname"
                placeholder="Enter Your Last Name"
                onChange={changeValue}
                required
              />
            </div>
            <div className="signupinput_field">
              <i className="uil uil-user-circle"></i>
              <label htmlFor="Username">Username</label>
              <br />
              <input
                type="text"
                id="Username"
                placeholder="Choose a Username"
                onChange={changeValue}
                required
              />
            </div>
            <div className="signupinput_field">
              <i className="uil uil-phone"></i>
              <label htmlFor="PhoneNumber">Phone Number</label>
              <br />
              <input
                type="text"
                id="PhoneNumber"
                placeholder="Enter Your Phone Number"
                onChange={changeValue}
                required
              />
            </div>
            <div className="signupinput_field">
              <i className="uil uil-envelope"></i>
              <label htmlFor="Email">Email</label>
              <br />
              <input
                type="email"
                id="Email"
                placeholder="Enter Your Email"
                onChange={changeValue}
                required
              />
            </div>
            <div className="signupinput_field">
              <i className="uil uil-lock"></i>
              <label htmlFor="Password">Password</label>
              <br />
              <input
                type="password"
                id="Password"
                placeholder="Enter Your Password"
                onChange={changeValue}
                required
              />
              <i
                className="uil uil-eye-slash"
                onClick={eyeShow}
                style={{ cursor: "pointer" }}
              ></i>
            </div>
            <p className="signuperrorShow">{errorMessage}</p>
            <div className="signupinput_field">
              <input type="submit" value="Register" className="register" />
              <br />
              Already Registered?
              <button
                style={{
                  backgroundColor: "transparent",
                  border: "none",
                  color: "blue",
                  cursor: "pointer",
                }}
                onClick={() => setPage("login")}
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  ) : (
    <Loginpage formDatas={formData}></Loginpage>
  );
};

export default Signup;
