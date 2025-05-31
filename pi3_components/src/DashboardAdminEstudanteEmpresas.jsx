import React from "react";
import SidebarAdminEstudante from "./components/admin/SidebarAdminEstudante.jsx";
import TabelaEmpresas from "./components/NoticiasHistorico/TabelaEmpresas.jsx";
import Breadcrumb from "./components/Breadcrumb";

const DashboardEmpresas = () => {
  const companiesData = [
    {
      name: "Google",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.\nLorem Ipsum has been the industry's standard dummy.",
    },
    {
      name: "Apple",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.\nLorem Ipsum has been the industry's standard dummy.",
    },
    // … adicione mais empresas conforme precisar
  ];

  const handleVerMais = () => {
    // aqui você pode abrir uma rota nova, chamar uma API, etc.
    alert("Você clicou em Ver mais!");
  };

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Sidebar */}
        <div className="p-0 col-2 col-md-3 col-lg-2">
          <SidebarAdminEstudante />
        </div>

        {/* Área principal */}
        <div className="col-10 col-md-9 col-lg-10 mt-4">
          <div className="container">
            {/* Breadcrumb fixo no topo */}
            <Breadcrumb caminho={["Dashboard", "Empresas"]} />

            {/* Tabela centralizada */}
            <div className="d-flex justify-content-center mt-3">
              <TabelaEmpresas
                companies={companiesData}
                onVerMais={handleVerMais}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardEmpresas;
