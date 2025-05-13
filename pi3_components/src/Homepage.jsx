import Navbar from "./components/navbar/Navbar";
import Footer from "./components/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import logo from "./assets/logo.png";
import Hero from "./components/Hero";
import CardNews from "./components/CardNews";
import HomeOportunidades from "./components/features/HomeOportunidades";
import { useNavigate } from "react-router-dom";

const title = "Plataforma de Emprego e Oportunidades";

const heroContent =
  "Bem-vindo à Plataforma de Emprego ESTGV, que conecta alunos e ex-alunos a oportunidades de trabalho/estágio. Cria o teu perfil, destaca as tuas competências e recebe recomendações de emprego adequadas às tuas metas profissionais. As empresas podem facilmente publicar ofertas, ajudando-te a encontrar a combinação perfeita para a tua carreira.";

function App() {
  return (
    <>
      <div className="page-container">
        <div className="content-wrap">
          <Hero
            title={title}
          >
            {heroContent}
          </Hero>
          <CardNews />
          <HomeOportunidades></HomeOportunidades>
        </div>
      </div>
    </>
  );
}

export default App;
