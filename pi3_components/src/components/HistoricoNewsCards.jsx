import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const NewsHistory = () => {
  const news = Array(8).fill({
    title: "Notícia Importante",
    date: "26/05/2025",
    description:
      "Esta é uma breve descrição da notícia. Clique para saber mais detalhes.",
  });

  return (
    <div className="container my-4">
      <h4 className="fw-bold">Histórico de Notícias</h4>

      {/* Filtros */}
      <div className="d-flex gap-2 mb-4">
        <select className="form-select w-auto">
          <option>Título</option>
        </select>
        <select className="form-select w-auto">
          <option>Data</option>
        </select>
        <select className="form-select w-auto">
          <option>Descrição</option>
        </select>
      </div>

      {/* Cards */}
      <div className="row g-4">
        {news.map((item, index) => (
          <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={index}>
            <div className="card h-100">
              <div className="card-body position-relative">
                <div
                  className="position-absolute top-0 end-0 p-2"
                  style={{ zIndex: 1 }}
                >
                  <i
                    className="bi bi-pencil me-2"
                    style={{ cursor: "pointer" }}
                  ></i>
                  <i
                    className="bi bi-trash"
                    style={{ cursor: "pointer" }}
                  ></i>
                </div>
                <h5 className="card-title">{item.title}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{item.date}</h6>
                <p className="card-text">{item.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Botão Ver Mais */}
      <div className="d-flex justify-content-end mt-4">
        <button className="btn btn-dark">Ver mais</button>
      </div>
    </div>
  );
};

export default NewsHistory;