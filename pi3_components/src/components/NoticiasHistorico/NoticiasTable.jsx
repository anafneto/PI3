import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const NewsTable = ({ data, editarHref = "/admin/alterar-noticia" }) => {
  const navigate = useNavigate();
  const [newsList, setNewsList] = useState(data);

  const handleEdit = (row) => {
    navigate(editarHref, { state: { noticia: row } });
  };

  const handleDelete = (index) => {
    const confirm = window.confirm("Tem a certeza que deseja eliminar esta notícia?");
    if (confirm) {
      const newList = [...newsList];
      newList.splice(index, 1);
      setNewsList(newList);
    }
  };

  const handleApprove = () => {
    alert("Notícia aprovada com sucesso (simulado).");
  };

  return (
    <div className="card">
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
            {newsList.map((row, index) => (
              <tr key={index}>
                <td>{row.title}</td>
                <td>{row.date}</td>
                <td>{row.description}</td>
                <td>
                  <i
                    className="bi bi-check2 me-3"
                    style={{ cursor: "pointer" }}
                    title="Aprovar"
                    onClick={handleApprove}
                  ></i>

                  <i
                    className="bi bi-pencil me-3"
                    style={{ cursor: "pointer" }}
                    title="Editar"
                    onClick={() => handleEdit(row)}
                  ></i>

                  <i
                    className="bi bi-trash"
                    style={{ cursor: "pointer" }}
                    title="Eliminar"
                    onClick={() => handleDelete(index)}
                  ></i>
                </td>
              </tr>
            ))}

            {newsList.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center text-muted">
                  Sem notícias disponíveis.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default NewsTable;
