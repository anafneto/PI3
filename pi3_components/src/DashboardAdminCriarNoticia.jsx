import React from "react";
import Sidebar from "./components/admin/Sidebar.jsx";
import Breadcrumb from "./components/Breadcrumb.jsx";
import Alterar from "./components/admin/alterar.jsx";

const DashboardAdminCriarNoticia = () => {
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
                titulo="Criar nova"
                subtitulo="Notícia"
                textoGuardar="Criar nova"
                mostrarBotaoRemover={false}
                campos={[
                  {
                    nome: "titulo",
                    tipo: "text",
                    label: "Título",
                    obrigatorio: true,
                  },
                  {
                    nome: "subtitulo",
                    tipo: "text",
                    label: "Subtítulo",
                    obrigatorio: false,
                  },
                  {
                    nome: "corpo",
                    tipo: "textarea",
                    label: "Corpo da notícia",
                    obrigatorio: true,
                  },
                  {
                    nome: "imagem",
                    tipo: "file",
                    label: "Imagem",
                    obrigatorio: true,
                  },
                  {
                    nome: "destacar",
                    tipo: "checkbox",
                    label: "Destacar",
                    obrigatorio: false,
                  },
                ]}
                onSubmit={(data) => {
                  console.log("Notícia submetida:", data);
                  alert("Notícia criada com sucesso!");
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardAdminCriarNoticia;
