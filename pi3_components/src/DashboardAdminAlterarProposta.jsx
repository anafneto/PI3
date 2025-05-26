import React, { useEffect, useState } from "react";
import Sidebar from "./components/admin/Sidebar.jsx";
import Breadcrumb from "./components/Breadcrumb.jsx";
import Alterar from "./components/admin/alterar.jsx";

const DashboardAdminAlterarProposta = () => {
  const [formData, setFormData] = useState(null);
  const [errors, setErrors] = useState({});

  // Simula carregamento de dados de uma proposta já existente
  useEffect(() => {
    const propostaExistente = {
      empresa: "empresa2",
      titulo: "Nova funcionalidade para plataforma",
      descricao: "Desenvolvimento de um novo módulo para integração com APIs externas.",
      contactoTelefonico: "912345678",
      email: "contato@empresa2.pt",
      competencias: "React, Node.js, API REST"
    };
    setFormData(propostaExistente);
  }, []);

  const handleSubmit = () => {
    const requiredFields = ["empresa", "titulo", "descricao", "contactoTelefonico", "email", "competencias"];
    const newErrors = {};

    requiredFields.forEach((field) => {
      if (!formData[field] || (Array.isArray(formData[field]) && formData[field].length === 0)) {
        newErrors[field] = "Campo obrigatório";
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    alert("Proposta alterada com sucesso!");
    console.log("Proposta atualizada:", formData);
  };

  const handleRemove = () => {
    if (window.confirm("Tem a certeza que quer remover esta proposta?")) {
      alert("Proposta removida com sucesso!");
      console.log("Proposta removida.");
    }
  };

  if (!formData) return <div className="p-5">A carregar proposta...</div>;

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
                subtitulo="Proposta"
                textoGuardar="Guardar alterações"
                mostrarBotaoRemover={true}
                valoresIniciais={formData}
                campos={[
                  {
                    nome: "empresa",
                    tipo: "select",
                    label: "Empresa",
                    obrigatorio: true
                  },
                  {
                    nome: "titulo",
                    tipo: "text",
                    label: "Título",
                    obrigatorio: true
                  },
                  {
                    nome: "descricao",
                    tipo: "textarea",
                    label: "Descrição",
                    obrigatorio: true
                  },
                  {
                    nome: "contactoTelefonico",
                    tipo: "text",
                    label: "Contacto Telefónico",
                    obrigatorio: true
                  },
                  {
                    nome: "email",
                    tipo: "email",
                    label: "Email",
                    obrigatorio: true
                  },
                  {
                    nome: "competencias",
                    tipo: "text",
                    label: "Competências",
                    obrigatorio: true
                  }
                ]}
                opcoes={{
                  empresa: [
                    { value: "", label: "Escolher" },
                    { value: "empresa1", label: "Empresa Exemplo 1" },
                    { value: "empresa2", label: "Empresa Exemplo 2" },
                    { value: "empresa3", label: "Empresa Exemplo 3" }
                  ]
                }}
                onSubmit={handleSubmit}
                onRemover={handleRemove}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardAdminAlterarProposta;
