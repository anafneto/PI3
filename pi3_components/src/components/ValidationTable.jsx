import React from "react";

const ValidationTable = ({ data }) => {
  return (
    <div className="card">
      <div className="card-header">
        <h5 className="card-title">Validações pendentes</h5>
      </div>
      <div className="px-3 py-0">
        <table className="table table-hover">
          <thead className="thead-light">
            <tr>
              <th>ID</th>
              <th>Utilizador</th>
              <th>Data</th>
              <th>Estado</th>
              <th>Descrição</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                <td className="px-0">
                  <span className="badge border border-dark text-dark">{row.id}</span>
                </td>
                <td>{row.user}</td>
                <td>{row.date}</td>
                <td>
                  <span className={`badge bg-${row.statusColor}`}>{row.status}</span>
                </td>
                <td>{row.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ValidationTable;