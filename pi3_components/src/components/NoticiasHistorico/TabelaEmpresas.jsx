import React from "react";

const TabelaEmpresas = ({ companies, onVerMais }) => {
  return (
    <div style={{ width: "90%", margin: "auto" }}>
      {/* Container “card” com borda e cantos arredondados */}
      <div
        style={{
          border: "1px solid #dee2e6",
          borderRadius: "8px",
          backgroundColor: "#fff",
          overflow: "hidden",
        }}
      >
        <table
          className="w-100"
          style={{
            borderCollapse: "separate",
            /* Espaçamento vertical entre linhas do tbody */
            borderSpacing: "0 8px",
          }}
        >
          <thead>
            <tr style={{ backgroundColor: "#f8f9fa" }}>
              <th
                className="text-start"
                style={{
                  padding: "12px 16px",
                  fontWeight: "bold",
                  /* Linha divisória logo abaixo do cabeçalho */
                  borderBottom: "1px solid #dee2e6",
                }}
              >
                Empresas
              </th>
              <th
                className="text-start"
                style={{
                  padding: "12px 16px",
                  fontWeight: "bold",
                  borderBottom: "1px solid #dee2e6",
                }}
              >
                Descrição
              </th>
            </tr>
          </thead>

          <tbody>
            {companies.length > 0 ? (
              companies.map((company, index) => (
                <tr
                  key={index}
                  style={{
                    backgroundColor: "#ffffff",
                    /* Sem sombra nem border-radius nas linhas */
                  }}
                >
                  <td
                    style={{
                      padding: "12px 16px",
                      verticalAlign: "top",
                    }}
                  >
                    {company.name}
                  </td>
                  <td style={{ padding: "12px 16px", whiteSpace: "pre-wrap" }}>
                    {company.description}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={2}
                  className="text-center text-muted"
                  style={{ padding: "16px" }}
                >
                  Sem empresas disponíveis.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Botão “Ver mais” fora do card, alinhado à direita */}
      <div className="d-flex justify-content-end" style={{ marginTop: "12px" }}>
        <button
          className="btn btn-dark"
          onClick={onVerMais}
          style={{ minWidth: "100px" }}
        >
          Ver mais
        </button>
      </div>
    </div>
  );
};

export default TabelaEmpresas;
