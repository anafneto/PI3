import React from "react";

const NewsTable = ({ data }) => {
  return (
    <div className="card">
      <div className="card-header">
        <h5 className="card-title">Histórico de Notícias</h5>
      </div>
      <div className="px-3 py-0">
        <table className="table table-hover">
          <thead className="thead-light">
            <tr>
              <th>Título</th>
              <th>Data</th>
              <th>Descrição</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                <td>{row.title}</td>
                <td>{row.date}</td>
                <td>{row.description}</td>
                <td>
                  {/* Ícones de ações em preto e branco */}
                  <i
                    className="bi bi-check2 text-dark me-2"
                    style={{ cursor: "pointer" }}
                    title="Aprovar"
                  ></i>
                    <i
                      className="bi bi-trash text-dark me-2"
                      style={{ cursor: "pointer" }}
                      title="Excluir"
                    ></i>
                  <i
                    className="bi bi-pencil text-dark me-2"
                    style={{ cursor: "pointer" }}
                    title="Editar"
                  ></i>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default NewsTable;