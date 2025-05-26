import React from 'react';

const DashboardGestorTable = ({ managers, onEdit, onDelete }) => {
  const handleEditClick = (gestor) => {
    const updatedData = prompt("Edite o nome do gestor:", gestor.nome);
    if (updatedData) {
      onEdit(gestor.id, { nome: updatedData });
    }
  };

  return (
        <div className="card">
      <div className="px-3 py-0">
        <table className="table table-hover">
          <thead className="thead-light">
      
        <tr>
          <th>ID</th>
          <th>Nome</th>
          <th>Estado</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {managers.map((gestor) => (
          <tr key={gestor.id}>
            <td>{gestor.id}</td>
            <td>{gestor.nome}</td>
            <td>{gestor.status}</td>
            <td>
              <i
                className="bi bi-check2 me-3"
                style={{ cursor: "pointer" }}
                title="Aprovar"
                onClick={() => alert("Gestor aprovado!")}
              ></i>

              <i
                className="bi bi-pencil me-3"
                style={{ cursor: "pointer" }}
                title="Editar"
                onClick={() => handleEditClick(gestor)}
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
      </tbody>
    </table>
    </div>
      </div>
  );
};

export default DashboardGestorTable;