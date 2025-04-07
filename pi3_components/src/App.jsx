import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./Homepage";
import Login from "./Login";
import Navbar from "./components/navbar/Navbar";
import logo from "./assets/logo.png";
import "./App.css"; // If you have global styles

function App() {
  return (
    <Router>
      <Navbar logo={logo} />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
