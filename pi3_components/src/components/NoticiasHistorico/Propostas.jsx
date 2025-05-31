import React, { useState, useMemo } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const Propostas = ({
  dadosPropostas,
  onVerMais,
  filtroLocalizacao,
  filtroTipoContrato,
  filtroHorario,
}) => {
  const [layout, setLayout] = useState("grid");

  const mostrarGrid = () => setLayout("grid");
  const mostrarLista = () => setLayout("list");

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
    <div className="mt-1"> {/* <-- reduzido de mt-3 para mt-1 */}
      {/* Botões de layout (grid/list) */}
      <div className="d-flex justify-content-end mb-2" style={{ marginTop: "-10px" }}>
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

      {/* Lista de propostas */}
      <div className="row g-3">
        {propostasFiltradas.length > 0 ? (
          propostasFiltradas.map((proposta, idx) => {
            const colClasses =
              layout === "grid"
                ? "col-12 col-sm-6 col-md-4 col-lg-3"
                : "col-12";

            return (
              <div className={colClasses} key={idx}>
                <div className="card h-100 shadow-sm">
                  <div className="card-body p-2">
                    <h6
                      className="card-title mb-1"
                      style={{ fontSize: "0.95rem" }}
                    >
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
            <p
              className="text-center text-muted mb-0"
              style={{ padding: "16px" }}
            >
              Nenhuma proposta encontrada com esses filtros.
            </p>
          </div>
        )}
      </div>

      {/* Botão Ver Mais */}
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
