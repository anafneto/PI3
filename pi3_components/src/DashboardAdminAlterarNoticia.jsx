import React, { useState, useEffect } from "react";
import Sidebar from "./components/admin/Sidebar.jsx";
import Breadcrumb from "./components/Breadcrumb.jsx";
import Alterar from "./components/admin/alterar.jsx";

const DashboardAdminAlterarNoticia = () => {
  const [noticia, setNoticia] = useState(null);

  // Simula fetch da notícia a ser editada
  useEffect(() => {
    // Exemplo de dados simulados
    const noticiaExistente = {
      titulo: "Título da Notícia",
      subtitulo: "Subtítulo informativo",
      corpo: "Este é o corpo da notícia que está a ser editada.",
      imagem: null, // Normalmente não se pré-carrega o ficheiro
      destacar: true,
    };

    setNoticia(noticiaExistente);
  }, []);

  if (!noticia) return <div>Carregando...</div>;

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
                titulo="Alterar"
                subtitulo="Notícia"
                textoGuardar="Guardar alterações"
                mostrarBotaoRemover={true}
                valoresIniciais={noticia}
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
                    obrigatorio: false,
                  },
                  {
                    nome: "destacar",
                    tipo: "checkbox",
                    label: "Destacar",
                    obrigatorio: false,
                  },
                ]}
                onSubmit={(data) => {
                  console.log("Notícia alterada:", data);
                  alert("Notícia alterada com sucesso!");
                }}
                onRemover={() => {
                  if (window.confirm("Tem a certeza que quer remover esta notícia?")) {
                    console.log("Notícia removida");
                    alert("Notícia removida com sucesso!");
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

export default DashboardAdminAlterarNoticia;
