import React, { useState } from "react";
import Sidebar from "./components/admin/Sidebar.jsx";
import Breadcrumb from "./components/Breadcrumb.jsx";
import Alterar from "./components/admin/alterar.jsx";

const DashboardAdminCriarEmpresa = () => {
  const [formData, setFormData] = useState({
    nomeEmpresa: "",
    nif: "",
    localizacao: "",
    email: "",
    contactoTelefonico: "",
    password: "",
    confirmarPassword: ""
  });

  const [errors, setErrors] = useState({});

  const handleSubmit = () => {
    const requiredFields = [
      "nomeEmpresa",
      "nif",
      "localizacao",
      "email",
      "contactoTelefonico",
      "password",
      "confirmarPassword"
    ];

    const newErrors = {};
    requiredFields.forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = "Campo obrigatório";
      }
    });

    if (formData.password !== formData.confirmarPassword) {
      newErrors.confirmarPassword = "As senhas não coincidem";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    alert("Empresa criada com sucesso!");
    console.log("Dados da empresa:", formData);
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
                titulo="Criar nova"
                subtitulo="Empresa"
                textoGuardar="Criar nova"
                mostrarBotaoRemover={false}
                campos={[
                  { nome: "nomeEmpresa", tipo: "text", label: "Nome da Empresa", obrigatorio: true },
                  { nome: "nif", tipo: "text", label: "Número de Identificação Fiscal", obrigatorio: true },
                  { nome: "localizacao", tipo: "text", label: "Localização", obrigatorio: true },
                  { nome: "email", tipo: "email", label: "Email", obrigatorio: true },
                  { nome: "contactoTelefonico", tipo: "text", label: "Contacto Telefónico", obrigatorio: true },
                  { nome: "password", tipo: "password", label: "Password", obrigatorio: true },
                  { nome: "confirmarPassword", tipo: "password", label: "Confirmar Password", obrigatorio: true }
                ]}
                onSubmit={handleSubmit}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardAdminCriarEmpresa;
