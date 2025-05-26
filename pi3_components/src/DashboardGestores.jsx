import React from "react";
import Sidebar from "./components/admin/Sidebar.jsx";
import Breadcrumb from "./components/Breadcrumb.jsx";
import ProposalCard from "./components/CardsPropostas.jsx"; 

const DashboardNoticias = () => {
  const propostas = [
    {
      title: "Gestor 1 ",
      company: "Nome do Gestor 1",
      description: "Departamento: Informática",
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
                titulo="Gestores"
                showFilters={false}                 // Mostrar ou não filtros
                proposals={propostas}               // Lista de propostas
                editarHref="/dashboard/alterar-noticia" // Link 
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardNoticias;
