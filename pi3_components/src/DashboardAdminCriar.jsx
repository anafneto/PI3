import React from "react";
import Sidebar from "./components/admin/Sidebar.jsx";
import Breadcrumb from "./components/Breadcrumb";
import Alterar from "./components/admin/alterar.jsx";

const DashboardAdminCriar = () => {
  const handleSubmit = (dados) => {
    alert("Dados salvos com sucesso!");
    console.log(dados);
  };

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
                titulo="Criar Novo"
                subtitulo="Gestor de Departamento"
                textoGuardar="Salvar"
                mostrarBotaoRemover={false} // não mostra botão "Remover"
                campos={[
                  { nome: "nomeCompleto", label: "Nome do Responsável", tipo: "text", obrigatorio: true },
                  { nome: "departamento", label: "Departamento", tipo: "select", obrigatorio: true },
                  { nome: "email", label: "Email", tipo: "email", obrigatorio: true },
                  { nome: "password", label: "Inserir Password", tipo: "password", obrigatorio: true },
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
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardAdminCriar;
