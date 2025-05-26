import React from "react";
import Sidebar from "./components/admin/Sidebar.jsx";
import NewsTable from "./components/NoticiasHistorico/NoticiasTable.jsx";
import Breadcrumb from "./components/Breadcrumb.jsx";

const HistoricoNoticias = () => {
  const newsData = [
    {
      title: "Notícia 1",
      date: "2025-05-26",
      description: "Descrição da notícia 1.",
    },
    {
      title: "Notícia 2",
      date: "2025-05-25",
      description: "Descrição da notícia 2.",
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
            <Breadcrumb />
            <div className="row justify-content-center">
              <div className="col-10 col-md-9 col-lg-10">
                <NewsTable data={newsData} editarHref="/dashboard/alterar-noticia" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoricoNoticias;
