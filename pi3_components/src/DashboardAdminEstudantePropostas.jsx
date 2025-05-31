import React, { useState } from "react";
import SidebarAdminEstudante from "./components/admin/SidebarAdminEstudante.jsx";
import Breadcrumb from "./components/Breadcrumb";
import Propostas from "./components/NoticiasHistorico/Propostas.jsx";

const DashboardPropostas = () => {
  const listaPropostas = [
    {
      titulo: "Front-end Developer",
      empresa: "Deloitte",
      descricao:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.\nLorem Ipsum has been the industry's standard dummy.",
      localizacao: "Lisboa",
      tipoContrato: "Full-time",
      horario: "Remoto",
    },
    {
      titulo: "UI/UX Designer",
      empresa: "Accenture",
      descricao:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.\nLorem Ipsum has been the industry's standard dummy.",
      localizacao: "Porto",
      tipoContrato: "Part-time",
      horario: "Regular",
    },
    {
      titulo: "Back-end Developer",
      empresa: "Microsoft",
      descricao:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.\nLorem Ipsum has been the industry's standard dummy.",
      localizacao: "Coimbra",
      tipoContrato: "Full-time",
      horario: "Flexível",
    },
    {
      titulo: "Data Scientist",
      empresa: "Google",
      descricao:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.\nLorem Ipsum has been the industry's standard dummy.",
      localizacao: "Lisboa",
      tipoContrato: "Part-time",
      horario: "Remoto",
    },
    {
      titulo: "DevOps Engineer",
      empresa: "IBM",
      descricao:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.\nLorem Ipsum has been the industry's standard dummy.",
      localizacao: "Porto",
      tipoContrato: "Full-time",
      horario: "Regular",
    },
    {
      titulo: "Mobile Developer",
      empresa: "Amazon",
      descricao:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.\nLorem Ipsum has been the industry's standard dummy.",
      localizacao: "Coimbra",
      tipoContrato: "Estágio",
      horario: "Flexível",
    },
  ];

  // Estados dos filtros controlados pela dashboard
  const [filtroLocalizacao, setFiltroLocalizacao] = useState("");
  const [filtroTipoContrato, setFiltroTipoContrato] = useState("");
  const [filtroHorario, setFiltroHorario] = useState("");

  const handleVerMais = () => {
    alert("Você clicou em Ver mais!");
  };

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Sidebar */}
        <div className="p-0 col-2 col-md-3 col-lg-2">
          <SidebarAdminEstudante />
        </div>

        {/* Área principal */}
        <div className="col-10 col-md-9 col-lg-10 mt-4">
          <div className="container">
            <Breadcrumb caminho={["Dashboard", "Propostas"]} />

            {/* Filtros controlados pela dashboard */}
            <div className="row g-2 mt-2 mb-3">
              <div className="col-auto">
                <select
                  className="form-select form-select-sm"
                  value={filtroLocalizacao}
                  onChange={(e) => setFiltroLocalizacao(e.target.value)}
                >
                  <option value="">Localização</option>
                  <option value="Lisboa">Lisboa</option>
                  <option value="Porto">Porto</option>
                  <option value="Coimbra">Coimbra</option>
                </select>
              </div>

              <div className="col-auto">
                <select
                  className="form-select form-select-sm"
                  value={filtroTipoContrato}
                  onChange={(e) => setFiltroTipoContrato(e.target.value)}
                >
                  <option value="">Tipo de Contrato</option>
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Estágio">Estágio</option>
                </select>
              </div>

              <div className="col-auto">
                <select
                  className="form-select form-select-sm"
                  value={filtroHorario}
                  onChange={(e) => setFiltroHorario(e.target.value)}
                >
                  <option value="">Horário</option>
                  <option value="Regular">Regular</option>
                  <option value="Flexível">Flexível</option>
                  <option value="Remoto">Remoto</option>
                </select>
              </div>
            </div>

            {/* Lista de Propostas com filtros aplicados */}
            <div className="d-flex justify-content-center mt-3">
              <div style={{ width: "100%" }}>
                <Propostas
                  dadosPropostas={listaPropostas}
                  onVerMais={handleVerMais}
                  filtroLocalizacao={filtroLocalizacao}
                  filtroTipoContrato={filtroTipoContrato}
                  filtroHorario={filtroHorario}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPropostas;
