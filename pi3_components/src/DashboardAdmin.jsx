import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./App.css";

// Sidebar Component
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
        <a className="nav-link d-flex align-items-center" href="#">
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
              <a className="nav-link d-flex align-items-center ps-4" href="#">
                <span className="me-auto">Criar</span>
                <i className="bi bi-chevron-right" style={{ color: "#bcbcbc", fontSize: 16 }} />
              </a>
              <a className="nav-link d-flex align-items-center ps-4" href="#">
                <span className="me-auto">Alterar</span>
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
              <a className="nav-link d-flex align-items-center ps-4" href="#">
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
              <a className="nav-link d-flex align-items-center ps-4" href="#">
                <span className="me-auto">Criar</span>
                <i className="bi bi-chevron-right" style={{ color: "#bcbcbc", fontSize: 16 }} />
              </a>
            </div>
          )}
        </div>

        {/* Propostas */}
        <div>
          <button
            className="nav-link d-flex align-items-center w-100 bg-transparent border-0"
            style={{ color: "#fff", textAlign: "left" }}
            onClick={() => setPropostasOpen((open) => !open)}
            type="button"
          >
            <i className="bi bi-file-earmark-text" style={{ fontSize: 16 }} />
            <span className="ms-2">Propostas</span>
            <span className="ms-auto arrow-icon">
              <i
                className={`bi bi-chevron-${propostasOpen ? "down" : "right"}`}
                style={{ color: "#bcbcbc", fontSize: 16 }}
              />
            </span>
          </button>
          {propostasOpen && (
            <div>
              <a className="nav-link d-flex align-items-center ps-4" href="#">
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
              <a className="nav-link d-flex align-items-center ps-4" href="#">
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

const DashboardAdmin = () => (
  <div className="container-fluid">
    <div className="row">
      {/* Sidebar */}
      <div className="col-md-3 col-lg-2 p-0">
        <Sidebar />
      </div>
      {/* Main Content */}
      <div className="col-md-9 col-lg-10">
        <div className="container mt-4">
          <div className="small-box-row row">
            {/* Card 1 */}
            <div className="col-lg-3 col-6">
              <div className="small-box text-bg-primary">
                <div className="inner">
                  <h3>150</h3>
                  <p>New Orders</p>
                </div>
                <svg
                  className="small-box-icon"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path d="M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 00-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 000-1.5H5.378A2.25 2.25 0 017.5 15h11.218a.75.75 0 00.674-.421 60.358 60.358 0 002.96-7.228.75.75 0 00-.525-.965A60.864 60.864 0 005.68 4.509l-.232-.867A1.875 1.875 0 003.636 2.25H2.25zM3.75 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM16.5 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z"></path>
                </svg>
                <a
                  href="#"
                  className="small-box-footer link-light link-underline-opacity-0 link-underline-opacity-50-hover"
                >
                  More info <i className="bi bi-link-45deg"></i>
                </a>
              </div>
            </div>
            {/* Card 2 */}
            <div className="col-lg-3 col-6">
              <div className="small-box text-bg-success">
                <div className="inner">
                  <h3>
                    53<sup className="fs-5">%</sup>
                  </h3>
                  <p>Bounce Rate</p>
                </div>
                <svg
                  className="small-box-icon"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path d="M18.375 2.25c-1.035 0-1.875.84-1.875 1.875v15.75c0 1.035.84 1.875 1.875 1.875h.75c1.035 0 1.875-.84 1.875-1.875V4.125c0-1.036-.84-1.875-1.875-1.875h-.75zM9.75 8.625c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-.75a1.875 1.875 0 01-1.875-1.875V8.625zM3 13.125c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v6.75c0 1.035-.84 1.875-1.875 1.875h-.75A1.875 1.875 0 013 19.875v-6.75z"></path>
                </svg>
                <a
                  href="#"
                  className="small-box-footer link-light link-underline-opacity-0 link-underline-opacity-50-hover"
                >
                  More info <i className="bi bi-link-45deg"></i>
                </a>
              </div>
            </div>
            {/* Card 3 */}
            <div className="col-lg-3 col-6">
              <div className="small-box text-bg-warning">
                <div className="inner">
                  <h3>44</h3>
                  <p>User Registrations</p>
                </div>
                <svg
                  className="small-box-icon"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path d="M6.25 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM3.25 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM19.75 7.5a.75.75 0 00-1.5 0v2.25H16a.75.75 0 000 1.5h2.25v2.25a.75.75 0 001.5 0v-2.25H22a.75.75 0 000-1.5h-2.25V7.5z"></path>
                </svg>
                <a
                  href="#"
                  className="small-box-footer link-dark link-underline-opacity-0 link-underline-opacity-50-hover"
                >
                  More info <i className="bi bi-link-45deg"></i>
                </a>
              </div>
            </div>
          </div>

          {/* Tabela de Validações Pendentes */}
          <div className="card mt-4">
            <div className="card-header">
              <h5 className="card-title">Validações pendentes</h5>
            </div>
            <div className="cardAdmin-body">
              <table className="table table-hover table-striped-columns">
                <thead className="thead-light">
                  <tr>
                    <th>ID</th>
                    <th>Utilizador</th>
                    <th>Data</th>
                    <th>Estado</th>
                    <th>Descrição</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <span className="badge bg-success">#219</span>
                    </td>
                    <td>Alexander Pierce</td>
                    <td>11-7-2014</td>
                    <td>
                      <span className="badge bg-success">Aprovado</span>
                    </td>
                    <td>
                      Bacon ipsum dolor sit amet salami venison chicken flank fatback doner.
                    </td>
                  </tr>
                  <tr>
                    <td>#183</td>
                    <td>John Doe</td>
                    <td>11-7-2014</td>
                    <td>
                      <span className="badge bg-warning">Pendente</span>
                    </td>
                    <td>Bacon ipsum dolor sit amet salami.</td>
                  </tr>
                  <tr>
                    <td>#821</td>
                    <td>Bob Doe</td>
                    <td>11-7-2014</td>
                    <td>
                      <span className="badge bg-warning">Pendente</span>
                    </td>
                    <td>Bacon ipsum dolor sit amet salami.</td>
                  </tr>
                  <tr className="table-secondary">
                    <td>#175</td>
                    <td>Mike Doe</td>
                    <td>11-7-2014</td>
                    <td>
                      <span className="badge bg-danger">Denied</span>
                    </td>
                    <td>
                      Bacon ipsum dolor sit amet salami venison chicken flank fatback doner. Venison chicken flank fatback doner.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default DashboardAdmin;