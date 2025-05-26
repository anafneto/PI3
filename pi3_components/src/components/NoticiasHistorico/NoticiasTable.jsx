import React from "react";
import { useNavigate } from "react-router-dom";

const NewsTable = ({ data }) => {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate("/admin/alterar-noticia");
  };

  const handleDelete = () => {
    alert("Notícia eliminada (ação simulada).");
  };

  const handleApprove = () => {
    alert("Notícia aprovada (ação simulada).");
  };

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
                  <i
                    className="bi bi-check2 text-dark me-2"
                    style={{ cursor: "pointer" }}
                    title="Aprovar"
                    onClick={handleEdit}
                  ></i>
                    <i
                      className="bi bi-trash text-dark me-2"
                      style={{ cursor: "pointer" }}
                      title="Excluir"
                      onClick={handleDelete}
                  ></i>
                  <i
                    className="bi bi-pencil text-dark me-2"
                    style={{ cursor: "pointer" }}
                    title="Editar"
                    onClick={handleApprove}
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
