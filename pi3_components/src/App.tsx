import Navbar from "./components/navbar/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import logo from "./assets/logo.png";
import Hero from "./components/Hero";

const heroContent =
  "Bem-vindo à Plataforma de Emprego ESTGV, que conecta alunos e ex-alunos a oportunidades de trabalho/estágio. Cria o teu perfil, destaca as tuas competências e recebe recomendações de emprego adequadas às tuas metas profissionais. As empresas podem facilmente publicar ofertas, ajudando-te a encontrar a combinação perfeita para a tua carreira.";

const info1content = "100+";
const info1title = "Ofertas";

const info2content = "50+";
const info2title = "Empresas";

const info3content = "2000+";
const info3title = "Estudantes";

function App() {
  return (
    <>
      <Navbar logo={logo}></Navbar>
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
      ;
    </>
  );
}

export default App;
