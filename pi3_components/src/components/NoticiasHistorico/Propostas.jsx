// src/components/NoticiasHistorico/Propostas.jsx
import React, { useState, useMemo } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const Propostas = ({ dadosPropostas, onVerMais }) => {
  // Estados locais para cada filtro
  const [filtroLocalizacao, setFiltroLocalizacao] = useState("");
  const [filtroTipoContrato, setFiltroTipoContrato] = useState("");
  const [filtroHorario, setFiltroHorario] = useState("");
  // Estado para alternar layout: "grid" ou "list"
  const [layout, setLayout] = useState("grid");

  // Funções de alternância
  const mostrarGrid = () => setLayout("grid");
  const mostrarLista = () => setLayout("list");

  // Definimos cores para o botão ativo (btn-dark)
  const corAtiva = "#343a40";
  const corTextoAtiva = "#ffffff";

  const propostasFiltradas = useMemo(() => {
    return dadosPropostas.filter((p) => {
      const bateLocalizacao =
        filtroLocalizacao === "" || p.localizacao === filtroLocalizacao;

      const bateContrato =
        filtroTipoContrato === "" || p.tipoContrato === filtroTipoContrato;

      const bateHorario = filtroHorario === "" || p.horario === filtroHorario;

      return bateLocalizacao && bateContrato && bateHorario;
    });
  }, [dadosPropostas, filtroLocalizacao, filtroTipoContrato, filtroHorario]);

  return (
    <div className="mt-3">
      {/* === FILTROS e ÍCONES DE ALTERNÂNCIA === */}
      <div className="row g-2 align-items-center mb-4">
        {/* Filtro: Localização */}
        <div className="col-auto">
          <select
            className="form-select form-select-sm"
            value={filtroLocalizacao}
            onChange={(e) => setFiltroLocalizacao(e.target.value)}
            style={{ maxWidth: "200px" }}
          >
            <option value="">Localização</option>
            <option value="Lisboa">Lisboa</option>
            <option value="Porto">Porto</option>
            <option value="Coimbra">Coimbra</option>
          </select>
        </div>

        {/* Filtro: Tipo de Contrato */}
        <div className="col-auto">
          <select
            className="form-select form-select-sm"
            value={filtroTipoContrato}
            onChange={(e) => setFiltroTipoContrato(e.target.value)}
            style={{ maxWidth: "200px" }}
          >
            <option value="">Tipo de Contrato</option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Estágio">Estágio</option>
          </select>
        </div>

        {/* Filtro: Horário */}
        <div className="col-auto">
          <select
            className="form-select form-select-sm"
            value={filtroHorario}
            onChange={(e) => setFiltroHorario(e.target.value)}
            style={{ maxWidth: "200px" }}
          >
            <option value="">Horário</option>
            <option value="Regular">Regular</option>
            <option value="Flexível">Flexível</option>
            <option value="Remoto">Remoto</option>
          </select>
        </div>

        {/* Botões de alternância Grid / Lista (sem borda) */}
        <div className="col-auto ms-auto d-flex">
          <button
            type="button"
            className="btn btn-sm me-2"
            onClick={mostrarGrid}
            style={{
              padding: "0.25rem 0.5rem",
              border: "none",
              backgroundColor: layout === "grid" ? corAtiva : "transparent",
              color: layout === "grid" ? corTextoAtiva : "#6c757d",
            }}
          >
            <i className="bi bi-grid-3x2-gap" style={{ fontSize: "1rem" }}></i>
          </button>
          <button
            type="button"
            className="btn btn-sm"
            onClick={mostrarLista}
            style={{
              padding: "0.25rem 0.5rem",
              border: "none",
              backgroundColor: layout === "list" ? corAtiva : "transparent",
              color: layout === "list" ? corTextoAtiva : "#6c757d",
            }}
          >
            <i className="bi bi-list" style={{ fontSize: "1rem" }}></i>
          </button>
        </div>
      </div>

      {/* === CARDS DAS PROPOSTAS FILTRADAS === */}
      <div className="row g-3">
        {propostasFiltradas.length > 0 ? (
          propostasFiltradas.map((proposta, idx) => {
            // Em grid, usamos 4 colunas em telas grandes para cards menores
            const colClasses =
              layout === "grid"
                ? "col-12 col-sm-6 col-md-4 col-lg-3"
                : "col-12";

            return (
              <div className={colClasses} key={idx}>
                <div className="card h-100 shadow-sm">
                  <div className="card-body p-2">
                    <h6 className="card-title mb-1" style={{ fontSize: "0.95rem" }}>
                      {proposta.titulo}
                    </h6>
                    <small
                      className="text-muted mb-2 d-block"
                      style={{ fontSize: "0.8rem" }}
                    >
                      {proposta.empresa}
                    </small>

                    <p
                      className="card-text text-muted mb-0"
                      style={{
                        fontSize: "0.8rem",
                        whiteSpace: "pre-wrap",
                        lineHeight: "1.2rem",
                      }}
                    >
                      {proposta.descricao}
                    </p>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="col-12">
            <p className="text-center text-muted mb-0" style={{ padding: "16px" }}>
              Nenhuma proposta encontrada com esses filtros.
            </p>
          </div>
        )}
      </div>

      {/* Botão “Ver mais” (igual ao das empresas) */}
      <div className="d-flex justify-content-end mt-4">
        <button
          className="btn btn-dark"
          onClick={onVerMais}
          style={{ minWidth: "100px" }}
        >
          Ver mais
        </button>
      </div>
    </div>
  );
};

export default Propostas;
