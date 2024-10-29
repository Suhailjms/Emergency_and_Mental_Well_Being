import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Loginpage from "./Login/loginPage";
import Signup from "./Signup/SignUp";
import Dashboard from "./Dashboard/Dashboard";
import LocationSender from './LocationSender';
import SuccessPage from './SuccessPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Loginpage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path ="/location" element={<LocationSender />} />
          <Route path ="/success" element={<SuccessPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
