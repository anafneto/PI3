import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from "./components/admin/Sidebar.jsx";
import Breadcrumb from "./components/Breadcrumb.jsx";
import Cards from "./components/CardsPropostas.jsx"; // Importa o componente de cards de propostas

export default function CreateManagerForm() {
  return (
    <div className="container-fluid">
      <div className="row">
        {/* Sidebar fixa */}
        <div className="col-md-3 col-lg-2 p-0">
          <Sidebar />
        </div>

        {/* Conteúdo principal */}
        <div className="col-md-9 col-lg-10">
          <div className="container mt-4">
            <div className="row justify-content-center">
              <Breadcrumb />
              <Cards />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
