import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./Homepage";
import Login from "./Login";
import News from "./News";
import NewsDetails from "./NewsDetails";
import PedirCredenciais from "./PedirCredenciais";
import Navbar from "./components/navbar/Navbar";
import logo from "./assets/logo.png";
import Footer from "./components/Footer";
import "./App.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const contactInfo = {
  address:
    "Av. Cor. José Maria Vale de Andrade, Campus Politécnico, 3504-510 Viseu",
  phone: "+351 232 480 700 (Chamadas para a rede fixa nacional)",
  email: "ipv@sc.ipv.pt",
};

const socialLinks = {
  instagram: "#",
  facebook: "#",
  youtube: "#",
};

function App() {
  return (
    <div className="app">
      <Router>
        <Navbar logo={logo} />
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/news" element={<News />} />
            <Route path="/news/:id" element={<NewsDetails />} />
            <Route path="/credentials" element={<PedirCredenciais />} />
          </Routes>
        <Footer contactInfo={contactInfo} socialLinks={socialLinks} />
      </Router>
    </div>
  );
}

export default App;
