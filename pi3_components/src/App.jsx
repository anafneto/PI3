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
import NewsDetails from "./NewsDetails";
import NotFoundPage from "./Erro404.jsx";
import PedirCredenciais from "./PedirCredenciais";
import Navbar from "./components/navbar/Navbar";
import logo from "./assets/logo.png";
import Footer from "./components/Footer";
import "./App.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import DashboardPropostas from "./DashboardPropostas.jsx";
import HistoricoNoticias from "./HistoricoNoticias.jsx"; 

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
            <Route path="/admin" element={<DashboardAdmin/>} />
            <Route path="/admincriarestudante" element={<DashboardAdminCriarEstudante/>} />
            <Route path="/admin/alterar-gestor" element={<DashboardAdminAlterar/>} />
            <Route path="/admin/criar-gestor" element={<DashboardAdminCriar/>} /> 
            <Route path="/admin/criar-noticia" element={<DashboardAdminCriarNoticia />} />
            <Route path="*" element={<NotFoundPage />} /> {/* Rota par ao erro 404 */}
            <Route path="admin/propostas" element={<DashboardPropostas />} />
            <Route path="HistoricoNoticias" element={<HistoricoNoticias />} />
          </Routes>
        <Footer contactInfo={contactInfo} socialLinks={socialLinks} />
      </Router>
    </div>
  );
}

export default App;
