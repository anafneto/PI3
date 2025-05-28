import React, { useState } from "react";

const Sidebar = () => {
  const [gestoresOpen, setGestoresOpen] = useState(false);
  const [estudantesOpen, setEstudantesOpen] = useState(false);
  const [empresasOpen, setEmpresasOpen] = useState(false);
  const [propostasOpen, setPropostasOpen] = useState(false);
  const [noticiasOpen, setNoticiasOpen] = useState(false);
  const [notificacoesOpen, setNotificacoesOpen] = useState(false);
  return (
    <div className="sidebar d-flex flex-column p-3" style={{ minHeight: "100vh", minWidth: "220px" }}>
      <div className="logo mb-4 fs-4 fw-bold">Estudantes</div>
      <input
        type="text"
        className="form-control search-box mb-3"
        placeholder="Pesquisar"
      />
      <nav className="nav flex-column">
        {/* Dashboard (sem dropdown) */}
        <a className="nav-link d-flex align-items-center" href="/dashboard/estudantes">
          <i className="bi bi-grid" style={{ fontSize: 16 }} />
          <span className="ms-2">Dashboard</span>
        </a>
        {/* Estudantes */}
        <div>
          <div className="nav-link d-flex align-items-center w-100 bg-transparent border-0 justify-content-between">
            <div
              className="d-flex align-items-center"
              role="button"
              onClick={() => (window.location.href = "/dashboard/Alterar-Dados-Pessoais")}
              style={{ color: "#fff" }}
            >
              <i className="bi bi-person" style={{ fontSize: 16 }} />
              <span className="ms-2">Perfil</span>
            </div>
          </div>
        </div>

        {/* Empresas */}
        <div>
          <div className="nav-link d-flex align-items-center w-100 bg-transparent border-0 justify-content-between">
            <div
              className="d-flex align-items-center"
              role="button"
              onClick={() => (window.location.href = "/dashboard/empresas-estudantes")}
              style={{ color: "#fff" }}
            >
              <i className="bi bi-briefcase" style={{ fontSize: 16 }} />
              <span className="ms-2">Empresas</span>
            </div>
          </div>
        </div>

        {/* Propostas */}
        <div>
          <div className="nav-link d-flex align-items-center w-100 bg-transparent border-0 justify-content-between">
            <div
              className="d-flex align-items-center"
              role="button"
              onClick={() => (window.location.href ="/dashboard/Propostas-Estudantes")}
              style={{ color: "#fff" }}
            >
              <i className="bi bi-file-earmark-text" style={{ fontSize: 16 }} />
              <span className="ms-2">Propostas</span>
            </div>
          </div>
        </div>

      </nav>
    </div>
  );
};

export default Sidebar;