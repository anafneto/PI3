import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from "./components/admin/Sidebar.jsx";
import Breadcrumb from "./components/Breadcrumb.jsx";
import Cards from "./components/CardsPropostas.jsx"; // Importa o componente de cards de propostas


export default function CreateManagerForm() {
  return (
    <div className="d-flex" style={{ minHeight: "100vh" }}>
      {/* Sidebar fixa */}
      <Sidebar />

      {/* Conteúdo principal que ocupa o restante */}
      <div className="flex-grow-1 container py-5">
        {/* Breadcrumb */}
        <Breadcrumb />

        {/* Cards de Propostas */}
        <Cards />
      </div>
    </div>
  );
}
