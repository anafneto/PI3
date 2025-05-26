import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useNavigate } from "react-router-dom";

const ProposalCard = ({
  titulo = "Propostas",
  proposals = [],
  showFilters = true,
  editarHref = "/admin/alterar-proposta", // <- NOVA PROP
}) => {
  const navigate = useNavigate();
  const [propostas, setPropostas] = React.useState(proposals);

  return (
    <div className="container my-4">
      <h4 className="fw-bold">{titulo}</h4>

      {showFilters && (
        <div className="d-flex gap-2 mb-4">
          <select className="form-select w-auto">
            <option>Localização</option>
          </select>
          <select className="form-select w-auto">
            <option>Tipo de Contrato</option>
          </select>
          <select className="form-select w-auto">
            <option>Horário</option>
          </select>
        </div>
      )}

      <div className="row g-4">
        {propostas.map((p, index) => (
          <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={index}>
            <div className="card h-100">
              <div className="card-body position-relative pe-5">
                <div
                  className="position-absolute top-0 end-0 p-2"
                  style={{ zIndex: 1 }}
                >
                  <i
                    className="bi bi-pencil me-2"
                    style={{ cursor: "pointer" }}
                    onClick={() => navigate(editarHref)}
                  ></i>
                  <i
                    className="bi bi-trash"
                    style={{ cursor: "pointer" }}
                    onClick={() =>
                      window.confirm("Deseja remover esta proposta?") &&
                      alert("Proposta removida.")
                    }
                  ></i>
                </div>

                <h5 className="card-title text-break">{p.title}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{p.company}</h6>
                <p className="card-text">{p.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="d-flex justify-content-end mt-4">
        <button
          className="btn btn-dark"
          onClick={() => navigate("/admin/criar-proposta")}
        >
          Criar Proposta
        </button>
      </div>
    </div>
  );
};

export default ProposalCard;
