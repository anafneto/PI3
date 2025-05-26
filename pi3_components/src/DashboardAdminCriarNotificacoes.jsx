import React, { useState } from "react";
import Sidebar from "./components/admin/Sidebar.jsx";
import Breadcrumb from "./components/Breadcrumb.jsx";
import Alterar from "./components/admin/alterar.jsx";

const DashboardAdminCriarProposta = () => {
  const [formData, setFormData] = useState({
    empresa: "",
    titulo: "",
    descricao: "",
    contactoTelefonico: "",
    email: "",
    competencias: []
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

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

    alert("Proposta criada com sucesso!");
    console.log("Dados da Proposta:", formData);
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
                titulo="Criar"
                subtitulo="Noticia"
                textoGuardar="Criar nova"
                mostrarBotaoRemover={false}
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
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardAdminCriarProposta;
