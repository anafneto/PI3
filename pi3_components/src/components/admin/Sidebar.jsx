import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


const Sidebar = () => {
  const [gestoresOpen, setGestoresOpen] = useState(false);
  const [estudantesOpen, setEstudantesOpen] = useState(false);
  const [empresasOpen, setEmpresasOpen] = useState(false);
  const [propostasOpen, setPropostasOpen] = useState(false);
  const [noticiasOpen, setNoticiasOpen] = useState(false);

  return (
    <div className="sidebar d-flex flex-column p-3" style={{ minHeight: "100vh", minWidth: "220px" }}>
      <div className="logo mb-4 fs-4 fw-bold">Admin</div>
      <input
        type="text"
        className="form-control search-box mb-3"
        placeholder="Pesquisar"
      />
      <nav className="nav flex-column">
        {/* Dashboard (sem dropdown) */}
        <a className="nav-link d-flex align-items-center" href="/dashboard">
          <i className="bi bi-grid" style={{ fontSize: 16 }} />
          <span className="ms-2">Dashboard</span>
        </a>

        {/* Gestores */}
        <div>
          <div
            className="nav-link d-flex align-items-center w-100 bg-transparent border-0 justify-content-between"
          >
            <div
              className="d-flex align-items-center"
              role="button"
              onClick={() => (window.location.href = "/dashboard/gestores")}
              style={{ color: "#fff" }}
            >
              <i className="bi-person-gear" style={{ fontSize: 16 }} />
              <span className="ms-2">Gestores</span>
            </div>
            <button
              onClick={() => setEmpresasOpen((open) => !open)}
              className="bg-transparent border-0 p-0"
            >
              <i
                className={`bi bi-chevron-${empresasOpen ? "down" : "right"}`}
                style={{ color: "#bcbcbc", fontSize: 16 }}
              />
            </button>
          </div>
          {empresasOpen && (
            <div>
              <a
                className="nav-link d-flex align-items-center ps-4"
                href="/dashboard/criar-empresa"
              >
                <span className="me-auto">Criar</span>
                <i
                  className="bi bi-chevron-right"
                  style={{ color: "#bcbcbc", fontSize: 16 }}
                />
              </a>
            </div>
          )}
        </div>


        {/* Estudantes */}
        <div>
          <div
            className="nav-link d-flex align-items-center w-100 bg-transparent border-0 justify-content-between"
          >
            <div
              className="d-flex align-items-center"
              role="button"
              onClick={() => (window.location.href = "/dashboard/estudante")}
              style={{ color: "#fff" }}
            >
              <i className="bi bi-person" style={{ fontSize: 16 }} />
              <span className="ms-2">Estudantes</span>
            </div>
            <button
              onClick={() => setEstudantesOpen((open) => !open)}
              className="bg-transparent border-0 p-0"
            >
              <i
                className={`bi bi-chevron-${estudantesOpen ? "down" : "right"}`}
                style={{ color: "#bcbcbc", fontSize: 16 }}
              />
            </button>
          </div>
          {estudantesOpen && (
            <div>
              <a className="nav-link d-flex align-items-center ps-4" href="/dashboard/criar-estudante">
                <span className="me-auto">Criar</span>
                <i className="bi bi-chevron-right" style={{ color: "#bcbcbc", fontSize: 16 }} />
              </a>
            </div>
          )}
        </div>


        {/* Empresas */}
        <div>
          <div
            className="nav-link d-flex align-items-center w-100 bg-transparent border-0 justify-content-between"
          >
            <div
              className="d-flex align-items-center"
              role="button"
              onClick={() => (window.location.href = "/dashboard/empresas")}
              style={{ color: "#fff" }}
            >
              <i className="bi bi-briefcase" style={{ fontSize: 16 }} />
              <span className="ms-2">Empresas</span>
            </div>
            <button
              onClick={() => setEmpresasOpen((open) => !open)}
              className="bg-transparent border-0 p-0"
            >
              <i
                className={`bi bi-chevron-${empresasOpen ? "down" : "right"}`}
                style={{ color: "#bcbcbc", fontSize: 16 }}
              />
            </button>
          </div>
          {empresasOpen && (
            <div>
              <a className="nav-link d-flex align-items-center ps-4" href="/dashboard/criar-empresa">
                <span className="me-auto">Criar</span>
                <i className="bi bi-chevron-right" style={{ color: "#bcbcbc", fontSize: 16 }} />
              </a>
            </div>
          )}
        </div>

        {/* Propostas */}
        <div>
          <div className="nav-link d-flex align-items-center w-100 bg-transparent border-0 justify-content-between">
            <div
              className="d-flex align-items-center"
              role="button"
              onClick={() => (window.location.href = "/dashboard/propostas")}
              style={{ color: "#fff" }}
            >
              <i className="bi bi-file-earmark-text" style={{ fontSize: 16 }} />
              <span className="ms-2">Propostas</span>
            </div>
            <button
              onClick={() => setPropostasOpen((open) => !open)}
              className="bg-transparent border-0 p-0"
            >
              <i
                className={`bi bi-chevron-${propostasOpen ? "down" : "right"}`}
                style={{ color: "#bcbcbc", fontSize: 16 }}
              />
            </button>
          </div>
          {propostasOpen && (
            <div>
              <a className="nav-link d-flex align-items-center ps-4" href="/dashboard/criar-proposta">
                <span className="me-auto">Criar</span>
                <i className="bi bi-chevron-right" style={{ color: "#bcbcbc", fontSize: 16 }} />
              </a>
              <a className="nav-link d-flex align-items-center ps-4" href="/dashboard/historico-propostas">
                <span className="me-auto">Histórico</span>
                <i className="bi bi-chevron-right" style={{ color: "#bcbcbc", fontSize: 16 }} />
              </a>
            </div>
          )}
        </div>

        {/* Notícias */}
        <div>
          <div className="nav-link d-flex align-items-center w-100 bg-transparent border-0 justify-content-between">
            <div
              className="d-flex align-items-center"
              role="button"
              onClick={() => (window.location.href = "/dashboard/noticias")}
              style={{ color: "#fff" }}
            >
              <i className="bi bi-calendar" style={{ fontSize: 16 }} />
              <span className="ms-2">Notícias</span>
            </div>
            <button
              onClick={() => setNoticiasOpen((open) => !open)}
              className="bg-transparent border-0 p-0"
            >
              <i
                className={`bi bi-chevron-${noticiasOpen ? "down" : "right"}`}
                style={{ color: "#bcbcbc", fontSize: 16 }}
              />
            </button>
          </div>
          {noticiasOpen && (
            <div>
              <a className="nav-link d-flex align-items-center ps-4" href="/dashboard/criar-noticia">
                <span className="me-auto">Criar</span>
                <i className="bi bi-chevron-right" style={{ color: "#bcbcbc", fontSize: 16 }} />
              </a>

            </div>
          )}
        </div>


      </nav>
    </div>
  );
};


export default Sidebar;