import React from "react";
import Sidebar from "./components/admin/Sidebar.jsx";
import Breadcrumb from "./components/Breadcrumb";
import Alterar from "./components/admin/Alterar.jsx";

const DashboardAdminAlterar = () => {
  const handleSubmit = (dados) => {
    alert("Dados salvos com sucesso!");
    console.log(dados);
  };

  const handleRemover = () => {
    if (window.confirm("Tem certeza que deseja eliminar este responsável?")) {
      alert("Responsável eliminado!");
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3 col-lg-2 p-0">
          <Sidebar />
        </div>
        <div className="col-md-9 col-lg-10">
          <Breadcrumb />
          <div className="container mt-4">
            <div className="row justify-content-center">
              <Alterar
                titulo="Alterar"
                subtitulo="Gestor de Departamento"
                textoRemover="Eliminar Responsável"
                textoGuardar="Salvar"
                mostrarBotaoRemover={true}
                campos={[
                  { nome: "nomeCompleto", label: "Nome do Responsável", tipo: "text", obrigatorio: true },
                  { nome: "departamento", label: "Departamento", tipo: "select", obrigatorio: true },
                  { nome: "email", label: "Email", tipo: "email", obrigatorio: true },
                  { nome: "password", label: "Nova Password", tipo: "password", obrigatorio: true },
                  { nome: "confirmarPassword", label: "Repetir Password", tipo: "password", obrigatorio: true },
                ]}
                opcoes={{
                  departamento: [
                    { value: "", label: "Escolher departamento" },
                    { value: "informatica", label: "Informática" },
                    { value: "gestao", label: "Gestão" },
                    { value: "ambiente", label: "Ambiente" },
                    { value: "eletrotecnica", label: "Eletrotécnica" },
                  ]
                }}
                onSubmit={handleSubmit}
                onRemover={handleRemover}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardAdminAlterar;
