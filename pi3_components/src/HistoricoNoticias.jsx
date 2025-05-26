import React from "react";
import Sidebar from "./components/admin/Sidebar.jsx";
import NewsTable from "./components/NoticiasHistorico/NoticiasTable.jsx";
import Breadcrumb from "./components/Breadcrumb.jsx";

const HistoricoNoticias = () => {
  const newsData = [
    {
      title: "Notícia 1",
      date: "26/05/2025",
      description: "Descrição da notícia 1.",
    },
    {
      title: "Notícia 2",
      date: "25/05/2025",
      description: "Descrição da notícia 2.",
    },
  ];

  return (
    <div className="d-flex" style={{ minHeight: "100vh" }}>
      {/* Sidebar fixa */}
      <Sidebar />

      {/* Conteúdo principal que ocupa o restante */}
      <div className="flex-grow-1 container py-5">

        {/* Breadcrumb */}
       <Breadcrumb />
        {/* Conteúdo principal */}
        <div className="container mt-4 col-10 col-md-9 col-lg-10">
          <NewsTable data={newsData} />
        </div>
      </div>
</div>

  );
};

export default HistoricoNoticias;