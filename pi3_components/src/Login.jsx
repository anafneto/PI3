import Navbar from "./components/navbar/Navbar";
import Footer from "./components/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import logo from "./assets/logo.png";
import Hero from "./components/Hero";
import CardNews from "./components/CardNews";
import HomeOportunidades from "./components/features/HomeOportunidades";

function App() {
  return (
    <>
      <div className="page-container">
        <div className="content-wrap">
          <Navbar onClickLogin={() => setTest(true)} logo={logo}></Navbar>
        </div>
      </div>
    </>
  );
}

export default App;
