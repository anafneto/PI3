import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../App.css"; // Certifique-se de criar e importar o CSS

const ValidationTable = () => {
  // Dados da tabela definidos diretamente no código
  const data = [
    {
      id: "#219",
      user: "Alexander Pierce",
      date: "11-7-2014",
      status: "Aprovado",
      statusColor: "success",
      description: "Bacon ipsum dolor sit amet salami venison chicken flank fatback doner.",
    },
    {
      id: "#220",
      user: "John Doe",
      date: "11-7-2014",
      status: "Pendente",
      statusColor: "warning",
      description: "Bacon ipsum dolor sit amet salami.",
    },
    {
      id: "#222",
      user: "Mike Doe",
      date: "11-7-2014",
      status: "Denied",
      statusColor: "danger",
      description: "Bacon ipsum dolor sit amet salami venison chicken flank fatback doner.",
    },
  ];

  return (
    <div className="card">
      <div className="card-header">
        <h5 className="card-title">Validações pendentes</h5>
      </div>
      <div className="px-3 py-0">
        {/* Adiciona rolagem horizontal para dispositivos móveis */}
        <div className="table-responsive">
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
                  <td className="description-cell">{row.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ValidationTable;