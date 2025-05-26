import React from "react";
import Sidebar from "./components/admin/Sidebar.jsx";
import Breadcrumb from "./components/Breadcrumb.jsx";
import ProposalCard from "./components/CardsPropostas.jsx"; 

const DashboardAdminPropostas = () => {
  const propostas = [
    {
      title: "Frontend Developer",
      company: "Deloitte",
      description: "Trabalho remoto com foco em sistemas distribuídos.",
    },
   
  ];

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Sidebar */}
        <div className="col-md-3 col-lg-2 p-0">
          <Sidebar />
        </div>

        {/* Conteúdo */}
        <div className="col-md-9 col-lg-10">
          <div className="container mt-4">
            <div className="row justify-content-center">
              <Breadcrumb />
              <ProposalCard
                titulo="Propostas Disponíveis"
                showFilters={true}                 // Mostrar ou não filtros
                proposals={propostas}              // Lista de propostas
                editarHref="/dashboard/alterar-proposta" // Link 
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardAdminPropostas;
