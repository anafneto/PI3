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
        <a className="nav-link d-flex align-items-center" href="/admin">
          <i className="bi bi-grid" style={{ fontSize: 16 }} />
          <span className="ms-2">Dashboard</span>
        </a>

        {/* Gestores */}
        <div>
          <button
            className="nav-link d-flex align-items-center w-100 bg-transparent border-0"
            style={{ color: "#fff", textAlign: "left" }}
            onClick={() => setGestoresOpen((open) => !open)}
            type="button"
          >
            <i className="bi bi-file-earmark" style={{ fontSize: 16 }} />
            <span className="ms-2">Gestores</span>
            <span className="ms-auto arrow-icon">
              <i
                className={`bi bi-chevron-${gestoresOpen ? "down" : "right"}`}
                style={{ color: "#bcbcbc", fontSize: 16 }}
              />
            </span>
          </button>
          {gestoresOpen && (
            <div>
              <a className="nav-link d-flex align-items-center ps-4" href="/admin/criar-gestor">
                <span className="me-auto">Criar</span>
                <i className="bi bi-chevron-right" style={{ color: "#bcbcbc", fontSize: 16 }} />
              </a>
              <a className="nav-link d-flex align-items-center ps-4" href="/admin/alterar-gestor">
                <span className="me-auto" >Alterar</span>
                <i className="bi bi-chevron-right" style={{ color: "#bcbcbc", fontSize: 16 }} />
              </a>
            </div>
          )}
        </div>

        {/* Estudantes */}
        <div>
          <button
            className="nav-link d-flex align-items-center w-100 bg-transparent border-0"
            style={{ color: "#fff", textAlign: "left" }}
            onClick={() => setEstudantesOpen((open) => !open)}
            type="button"
          >
            <i className="bi bi-person" style={{ fontSize: 16 }} />
            <span className="ms-2">Estudantes</span>
            <span className="ms-auto arrow-icon">
              <i
                className={`bi bi-chevron-${estudantesOpen ? "down" : "right"}`}
                style={{ color: "#bcbcbc", fontSize: 16 }}
              />
            </span>
          </button>
          {estudantesOpen && (
            <div>
              <a className="nav-link d-flex align-items-center ps-4" href="/admin/criar-estudante">
                <span className="me-auto">Criar</span>
                <i className="bi bi-chevron-right" style={{ color: "#bcbcbc", fontSize: 16 }} />
              </a>
            </div>
          )}
        </div>

        {/* Empresas */}
        <div>
          <button
            className="nav-link d-flex align-items-center w-100 bg-transparent border-0"
            style={{ color: "#fff", textAlign: "left" }}
            onClick={() => setEmpresasOpen((open) => !open)}
            type="button"
          >
            <i className="bi bi-briefcase" style={{ fontSize: 16 }} />
            <span className="ms-2">Empresas</span>
            <span className="ms-auto arrow-icon">
              <i
                className={`bi bi-chevron-${empresasOpen ? "down" : "right"}`}
                style={{ color: "#bcbcbc", fontSize: 16 }}
              />
            </span>
          </button>
          {empresasOpen && (
            <div>
              <a className="nav-link d-flex align-items-center ps-4" href="/admin/criar-empresa">
                <span className="me-auto">Criar</span>
                <i className="bi bi-chevron-right" style={{ color: "#bcbcbc", fontSize: 16 }} />
              </a>
              <a className="nav-link d-flex align-items-center ps-4" href="/admin/alterar-empresa">
                <span className="me-auto">Alterar</span>
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
      onClick={() => (window.location.href = "/admin/propostas")}
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
      <a className="nav-link d-flex align-items-center ps-4" href="/admin/criar-proposta">
        <span className="me-auto">Criar</span>
        <i className="bi bi-chevron-right" style={{ color: "#bcbcbc", fontSize: 16 }} />
      </a>
      <a className="nav-link d-flex align-items-center ps-4" href="/admin/historico-propostas">
        <span className="me-auto">Histórico</span>
        <i className="bi bi-chevron-right" style={{ color: "#bcbcbc", fontSize: 16 }} />
      </a>
    </div>
  )}
</div>


        {/* Noticias */}
        <div>
          <button
            className="nav-link d-flex align-items-center w-100 bg-transparent border-0"
            style={{ color: "#fff", textAlign: "left" }}
            onClick={() => setNoticiasOpen((open) => !open)}
            type="button"
          >
            <i className="bi bi-calendar" style={{ fontSize: 16 }} />
            <span className="ms-2">Noticias</span>
            <span className="ms-auto arrow-icon">
              <i
                className={`bi bi-chevron-${noticiasOpen ? "down" : "right"}`}
                style={{ color: "#bcbcbc", fontSize: 16 }}
              />
            </span>
          </button>
          {noticiasOpen && (
            <div>
              <a className="nav-link d-flex align-items-center ps-4" href="/admin/criar-noticia">
                <span className="me-auto">Criar</span>
                <i className="bi bi-chevron-right" style={{ color: "#bcbcbc", fontSize: 16 }} />
              </a>
              <a className="nav-link d-flex align-items-center ps-4" href="#">
                <span className="me-auto">Histórico</span>
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