import Navbar from "./components/navbar/Navbar";
import Footer from "./components/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import logo from "./assets/logo.png";
import Hero from "./components/Hero";
import CardNews from "./components/CardNews";
import HomeOportunidades from "./components/features/HomeOportunidades";
import { Container } from "react-bootstrap"; // Import Container from react-bootstrap

const heroContent =
  "Bem-vindo à Plataforma de Emprego ESTGV, que conecta alunos e ex-alunos a oportunidades de trabalho/estágio. Cria o teu perfil, destaca as tuas competências e recebe recomendações de emprego adequadas às tuas metas profissionais. As empresas podem facilmente publicar ofertas, ajudando-te a encontrar a combinação perfeita para a tua carreira.";

const info1content = "100+";
const info1title = "Ofertas";

const info2content = "50+";
const info2title = "Empresas";

const info3content = "2000+";
const info3title = "Estudantes";

const contactInfo = {
  address: "Av. Cor. José Maria Vale de Andrade, Campus Politécnico, 3504-510 Viseu",
  phone: "+351 232 480 700 (Chamadas para a rede fixa nacional)",
  email: "ipv@sc.ipv.pt"
};

const socialLinks = {
  instagram: "#",
  facebook: "#",
  youtube: "#"
};

function App() {

  return (
    <>
      <div className="page-container">
        <div className="content-wrap">
          <Navbar onClickLogin={() => setTest(true)} logo={logo}></Navbar>
          <Hero
            title="Plataforma de Emprego e Oportunidades"
            info1content={info1content}
            info1title={info1title}
            info2content={info2content}
            info2title={info2title}
            info3content={info3content}
            info3title={info3title}
          >
            {heroContent}
          </Hero>
          <CardNews />
          <HomeOportunidades />
        </div>
      </div>
      <Footer contactInfo={contactInfo} socialLinks={socialLinks} />
    </>
  );
}

export default App;