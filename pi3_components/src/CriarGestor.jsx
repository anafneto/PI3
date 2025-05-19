import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from "./components/admin/Sidebar.jsx";
import Breadcrumb from "./components/Breadcrumb.jsx";

export default function CreateManagerForm() {
  return (
    <div className="d-flex" style={{ minHeight: "100vh" }}>
      {/* Sidebar fixa */}
      <Sidebar />

      {/* Conteúdo principal que ocupa o restante */}
      <div className="flex-grow-1 container py-5">

        {/* Breadcrumb */}
       <Breadcrumb />

        {/* Card */}
        <div
          className="card mx-auto shadow-sm cardgestor-no-border"
          style={{ maxWidth: "600px" }}
        >
          <div className="card-body">
            <h2 className="card-title text-center">Criar novo</h2>
            <p className="text-center text-muted mb-4">Gestor de Departamento</p>

            <form>
              {/* Nome */}
              <div className="mb-3">
                <label htmlFor="nome" className="form-label">Nome Completo *</label>
                <input
                  type="text"
                  className="form-control"
                  id="nome"
                  placeholder="Digite o nome completo"
                  required
                />
              </div>

              {/* Departamento */}
              <div className="mb-3">
                <label htmlFor="departamento" className="form-label">Departamento *</label>
                <select className="form-select" id="departamento" required>
                  <option value="">Escolher</option>
                  <option value="informatica">Informática</option>
                  <option value="gestao">Gestão</option>
                  <option value="eletronica">Eletrónica</option>
                </select>
              </div>

              {/* Email */}
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email *</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="exemplo@dominio.com"
                  required
                />
              </div>

              {/* Password */}
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password *</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  required
                />
              </div>

              {/* Confirm Password */}
              <div className="mb-3">
                <label htmlFor="confirmPassword" className="form-label">Confirmar Password *</label>
                <input
                  type="password"
                  className="form-control"
                  id="confirmPassword"
                  required
                />
              </div>

              {/* Submit */}
              <div className="d-flex justify-content-end">
                <button type="submit" className="btn btn-dark">Criar novo</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
