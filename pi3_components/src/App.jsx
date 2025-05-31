import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./Homepage";
import Login from "./Login";
import News from "./News";
import CriarGestor from "./CriarGestor";
import DashboardAdmin from "./DashboardAdmin";
import DashboardAdminAlterar from "./DashboardAdminAlterar";
import DashboardAdminCriar from "./DashboardAdminCriar";
import DashboardAdminCriarEstudante from "./DashboardAdminCriarEstudante";
import DashboardAdminCriarNoticia from "./DashboardAdminCriarNoticia.jsx";
import DashboardAdminCriarEmpresa from "./DashboardAdminCriarEmpresa.jsx";
import DashboardAdminCriarProposta from "./DashboardAdminCriarProposta.jsx";
import DashboardAdminAlterarEmpresa from "./DashboardAdminAlterarEmpresa.jsx";
import DashboardAdminAlterarNoticia from "./DashboardAdminAlterarNoticia.jsx";
import DashboardAdminAlterarProposta from "./DashboardAdminAlterarProposta.jsx";
import DashboardAdminAlterarEstudante from "./DashboardAdminAlterarEstudante.jsx";
import DashboardAdminCriarNotificacoes from "./DashboardAdminCriarNotificacoes.jsx";
import DashboardEstudante from "./DashboardEstudante.jsx";
import DashboardNoticias from "./DashboardNoticias.jsx";
import DashboardEmpresas from "./DashboardEmpresas.jsx";
import DashboardGestores from "./DashboardGestores.jsx";
import DashboardNotificacoes from "./DashboardNotificacoes.jsx";
import NewsDetails from "./NewsDetails";
import NotFoundPage from "./Erro404.jsx";
import PedirCredenciais from "./PedirCredenciais";
import Navbar from "./components/navbar/Navbar";
import logo from "./assets/logo.png";
import Footer from "./components/Footer";
import "./App.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import DashboardPropostas from "./DashboardPropostas.jsx";
import DashboardAdminEstudante from "./DashboardAdminEstudante.jsx";
import DashboardAdminEstudanteEmpresas from "./DashboardAdminEstudanteEmpresas.jsx";
import DashboardAdminEstudantePropostas from "./DashboardAdminEstudantePropostas.jsx";
import DashboardAdminEstudanteAlterar from "./DashboardAdminEstudantesAlterar.jsx";

const contactInfo = {
  address:
    "Av. Cor. José Maria Vale de Andrade, Campus Politécnico, 3504-510 Viseu",
  phone: "+351 232 480 700 (Chamadas para a rede fixa nacional)",
  email: "ipv@sc.ipv.pt",
};

const socialLinks = {
  instagram: "https://www.instagram.com/estgv_ipv/",
  facebook: "https://www.facebook.com/estgv?locale=pt_PT",
  youtube: "https://www.youtube.com/@politecnicodeviseu"
};

function App() {
  return (
    <div className="app">
      <Router>
        <Navbar logo={logo} />
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/noticias" element={<News />} />
            <Route path="/noticias/:id" element={<NewsDetails />} />
            <Route path="/credentials" element={<PedirCredenciais />} />
            <Route path="/dashboard" element={<DashboardAdmin/>} />
            <Route path="/dashboard/criar-estudante" element={<DashboardAdminCriarEstudante/>} />
            <Route path="/dashboard/alterar-gestor" element={<DashboardAdminAlterar/>} />
            <Route path="/dashboard/criar-gestor" element={<DashboardAdminCriar/>} /> 
            <Route path="/dashboard/criar-noticia" element={<DashboardAdminCriarNoticia />} />
            <Route path="/dashboard/criar-proposta" element={<DashboardAdminCriarProposta />} />
            <Route path="/dashboard/criar-empresa" element={<DashboardAdminCriarEmpresa />} />
            <Route path="/dashboard/alterar-empresa" element={<DashboardAdminAlterarEmpresa />} />
            <Route path="/dashboard/alterar-noticia" element={<DashboardAdminAlterarNoticia />} />
            <Route path="/dashboard/alterar-estudante" element={<DashboardAdminAlterarEstudante />} />
            <Route path="/dashboard/alterar-proposta" element={<DashboardAdminAlterarProposta />} />
            <Route path="/dashboard/criar-notificacoes" element={<DashboardAdminCriarNotificacoes />} />
            <Route path="/dashboard/noticias" element={<DashboardNoticias />} />
            <Route path="/dashboard/estudante" element={<DashboardEstudante />} />
            <Route path="/dashboard/empresas" element={<DashboardEmpresas />} />
            <Route path="/dashboard/gestores" element={<DashboardGestores />} />
            <Route path="/dashboard/notificacoes" element={<DashboardNotificacoes />} />
            <Route path="*" element={<NotFoundPage />} /> {/* Rota par ao erro 404 */}
            <Route path="dashboard/propostas" element={<DashboardPropostas />} />
            <Route path="/dashboard/estudantes" element={<DashboardAdminEstudante />} /> 
            <Route path="/dashboard/estudantes/empresas" element={<DashboardAdminEstudanteEmpresas />} /> 
            <Route path="/dashboard/estudantes/propostas" element={<DashboardAdminEstudantePropostas />} />
            <Route path="/dashboard/estudantes/alterar-dados-pessoais" element={<DashboardAdminEstudanteAlterar />} /> 
          </Routes>
        <Footer contactInfo={contactInfo} socialLinks={socialLinks} />
      </Router>
    </div>
  );
}

export default App;
