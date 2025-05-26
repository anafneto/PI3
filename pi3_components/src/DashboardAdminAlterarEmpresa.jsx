import React from "react";
import Sidebar from "./components/admin/Sidebar.jsx";
import Breadcrumb from "./components/Breadcrumb.jsx";
import Alterar from "./components/admin/alterar.jsx";

const DashboardAdminAlterarEmpresa = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3 col-lg-2 p-0">
          <Sidebar />
        </div>
        <div className="col-md-9 col-lg-10">
          <div className="container mt-4">
            <div className="row justify-content-center">
              <Breadcrumb />
              <Alterar
                titulo="Editar"
                subtitulo="Empresa"
                textoGuardar="Guardar alterações"
                mostrarBotaoRemover={true}
                campos={[
                  { nome: "nomeEmpresa", tipo: "text", label: "Nome da Empresa", obrigatorio: true },
                  { nome: "nif", tipo: "text", label: "Número de Identificação Fiscal", obrigatorio: true },
                  { nome: "localizacao", tipo: "text", label: "Localização", obrigatorio: true },
                  { nome: "email", tipo: "email", label: "Email", obrigatorio: true },
                  { nome: "contactoTelefonico", tipo: "text", label: "Contacto Telefónico", obrigatorio: true }
                ]}
                onSubmit={(data) => {
                  console.log("Empresa atualizada:", data);
                  alert("Alterações guardadas com sucesso!");
                }}
                onRemove={() => {
                  const confirmar = window.confirm("Tem a certeza que deseja remover esta empresa?");
                  if (confirmar) {
                    alert("Empresa removida com sucesso.");
                  }
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardAdminAlterarEmpresa;
