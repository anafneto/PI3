import React from "react";

const TabelaEmpresas = ({ companies }) => {
  return (
    <div className="card shadow-sm rounded" style={{ maxWidth: "800px", margin: "auto" }}>
      <div className="card-body p-3">
        <table className="table mb-0" style={{ borderCollapse: "separate", borderSpacing: "0 10px" }}>
          <thead>
            <tr>
              <th style={{ fontWeight: "bold" }}>Empresas</th>
              <th style={{ fontWeight: "bold" }}>Descrição</th>
            </tr>
          </thead>
          <tbody>
            {companies.map((company, index) => (
              <tr key={index} style={{ backgroundColor: "#fff", borderRadius: "8px" }}>
                <td style={{ verticalAlign: "top" }}>{company.name}</td>
                <td>{company.description}</td>
              </tr>
            ))}
            {companies.length === 0 && (
              <tr>
                <td colSpan="2" className="text-center text-muted">
                  Sem empresas disponíveis.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TabelaEmpresas;
