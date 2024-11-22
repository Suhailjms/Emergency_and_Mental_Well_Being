// // import React, { useState, useEffect } from "react";
// // import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// // import Dashboard from "./components/Dashboard/Dashboard";
// // import { Loginpage } from "./components/Login/loginPage";
// // import Signup from "./components/Signup/SingnupPage";

// // function App() {
// //   const [isLoggedIn, setIsLoggedIn] = useState(false);

// //   useEffect(() => {
// //     const loggedInStatus = localStorage.getItem("isLoggedIn");
// //     if (loggedInStatus === "true") {
// //       setIsLoggedIn(true);  // User is logged in, so set state to true
// //     }
// //   }, []);

// //   // Function to handle successful login
// //   const handleLoginSuccess = () => {
// //     setIsLoggedIn(true);
// //     localStorage.setItem("isLoggedIn", "true"); // Persist login state in localStorage
// //   };

// //   // Function to handle logout (optional)
// //   const handleLogout = () => {
// //     setIsLoggedIn(false);
// //     localStorage.removeItem("isLoggedIn"); // Remove login state from localStorage on logout
// //   };

// //   return (
// //     <Router>
// //       <div className="App">
// //         <Routes>
// //           {/* Redirect to the dashboard if logged in, otherwise to the login page */}
// //           <Route
// //             path="/"
// //             element={
// //               isLoggedIn ? (
// //                 <Navigate to="/dashboard" replace />
// //               ) : (
// //                 <Navigate to="/login" replace />
// //               )
// //             }
// //           />
// //           {/* Login Route */}
// //           <Route
// //             path="/login"
// //             element={<Loginpage onLoginSuccess={handleLoginSuccess} />}
// //           />
// //           {/* Signup Route */}
// //           <Route path="/signup" element={<Signup />} />
// //           {/* Dashboard Route, only accessible if logged in */}
// //           <Route
// //             path="/dashboard"
// //             element={
// //               isLoggedIn ? (
// //                 <Dashboard onLogout={handleLogout} />
// //               ) : (
// //                 <Navigate to="/login" replace />
// //               )
// //             }
// //           />
// //         </Routes>
// //       </div>
// //     </Router>
// //   );
// // }

// // export default App;
// import React, { useState, useEffect } from "react";
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import Dashboard from "./components/Dashboard/Dashboard";
// import { Loginpage } from "./components/Login/loginPage";
// import Signup from "./components/Signup/SingnupPage";

// function App() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   // Check login status from localStorage on app initialization
//   useEffect(() => {
//     const loggedInStatus = localStorage.getItem("isLoggedIn");
//     if (loggedInStatus === "true") {
//       setIsLoggedIn(true);  // User is logged in, so set state to true
//     }
//   }, []);

//   // Function to handle successful login
//   const handleLoginSuccess = () => {
//     setIsLoggedIn(true);
//     localStorage.setItem("isLoggedIn", "true");  // Persist login state in localStorage
//   };

//   // Function to handle logout (optional)
//   const handleLogout = () => {
//     setIsLoggedIn(false);
//     localStorage.removeItem("isLoggedIn");  // Remove login state from localStorage on logout
//   };

//   return (
//     <Router>
//       <div className="App">
//         <Routes>
//           {/* Redirect to the dashboard if logged in, otherwise to the login page */}
//           <Route
//             path="/"
//             element={
//               isLoggedIn ? (
//                 <Navigate to="/dashboard" replace />
//               ) : (
//                 <Navigate to="/login" replace />
//               )
//             }
//           />
//           {/* Login Route */}
//           <Route
//             path="/login"
//             element={<Loginpage onLoginSuccess={handleLoginSuccess} />}
//           />
//           {/* Signup Route */}
//           <Route path="/signup" element={<Signup />} />
//           {/* Dashboard Route, only accessible if logged in */}
//           <Route
//             path="/dashboard"
//             element={
//               isLoggedIn ? (
//                 <Dashboard onLogout={handleLogout} />
//               ) : (
//                 <Navigate to="/login" replace />
//               )
//             }
//           />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;
import React, { useEffect, useState } from "react";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard";
import { Loginpage } from "./components/Login/loginPage";
import Signup from "./components/Signup/SingnupPage";
import LocationSender from "./components/SOS/LocationSender";
import ManageContacts from "./components/SOS/ManageContacts";
import SuccessPage from "./components/SOS/SuccessPage";
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check login status from localStorage on app initialization
  useEffect(() => {
    const loggedInStatus = localStorage.getItem("isLoggedIn");
    setIsLoggedIn(loggedInStatus === "true"); // Set state based on localStorage
    console.log("isLoggedIn from useEffect:", loggedInStatus); // Check localStorage value
  }, []);

  // Function to handle successful login
  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    localStorage.setItem("isLoggedIn", "true"); // Persist login state in localStorage
    console.log("User logged in successfully"); // Log successful login
  };

  // Function to handle logout (optional)
  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("isLoggedIn"); // Remove login state from localStorage on logout
    console.log("User logged out"); // Log logout
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Redirect to the dashboard if logged in, otherwise to the login page */}
          <Route
            path="/"
            element={
              isLoggedIn ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          {/* Login Route */}
          <Route
            path="/login"
            element={<Loginpage onLoginSuccess={handleLoginSuccess} />}
          />
          {/* Signup Route */}
          <Route path="/signup" element={<Signup />} />
          {/* Dashboard Route, only accessible if logged in */}
          <Route
            path="/dashboard"
            element={
              isLoggedIn ? (
                <Dashboard onLogout={handleLogout} />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route path="/manage-contacts" element={<ManageContacts />} />
          <Route path="/success" element={<SuccessPage />} />
          <Route
            path="/LocationSender"
            element={<LocationSender></LocationSender>}
          ></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
