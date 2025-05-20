import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const ProposalCard = () => {
  const proposals = Array(8).fill({
    title: "Front-end Developer",
    company: "Deloitte",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.",
  });

  return (
    <div className="container my-4">
      <h4 className="fw-bold">Propostas</h4>

      {/* Filtros */}
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

      {/* Cards */}
<div className="row g-4">
  {proposals.map((proposal, index) => (
    <div className="col-md-3" key={index}>
      <div
        className="card position-relative d-flex flex-column"
      >
        <div className="card-body flex-grow-1">
          <div
            className="position-absolute top-0 end-0 p-2"
            style={{ zIndex: 1 }}
          >
            <i className="bi bi-pencil me-2" style={{ cursor: "pointer" }}></i>
            <i className="bi bi-trash" style={{ cursor: "pointer" }}></i>
          </div>
          <h5 className="card-title">{proposal.title}</h5>
          <h6 className="card-subtitle mb-2 text-muted">{proposal.company}</h6>
          <p className="card-text">{proposal.description}</p>
        </div>
      </div>
    </div>
  ))}
</div>

      <div className="d-flex justify-content-end mt-4">
        <button className="btn btn-dark">Ver mais</button>
      </div>
    </div>
  );
};

export default ProposalCard;
