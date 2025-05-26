import React, { useState } from "react";
import Sidebar from "./components/admin/Sidebar.jsx";
import Breadcrumb from "./components/Breadcrumb.jsx";
import Alterar from "./components/admin/alterar.jsx";

const DashboardAdminCriarEstudante = () => {
  const [formData, setFormData] = useState({
    nomeCompleto: "",
    numeroEstudante: "",
    curso: "",
    email: "",
    competencias: [], // ← chips
    password: "",
    confirmarPassword: ""
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = () => {
    const newErrors = {};
    const requiredFields = ["nomeCompleto", "numeroEstudante", "curso", "email", "password", "confirmarPassword"];

    requiredFields.forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = "Campo obrigatório";
      }
    });

    if (
      formData.password &&
      formData.confirmarPassword &&
      formData.password !== formData.confirmarPassword
    ) {
      newErrors.confirmarPassword = "As senhas não coincidem";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    alert("Estudante criado com sucesso!");
    console.log(formData);
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
                titulo="Criar"
                subtitulo="Estudante"
                textoGuardar="Criar novo"
                mostrarBotaoRemover={false}
                campos={[
                  { nome: "nomeCompleto", tipo: "text", label: "Nome Completo", obrigatorio: true },
                  { nome: "numeroEstudante", tipo: "text", label: "Número Mecanográfico", obrigatorio: true },
                  { nome: "curso", tipo: "select", label: "Curso", obrigatorio: true },
                  { nome: "contactoTelefonico", tipo: "text", label: "Contacto Telefónico", obrigatorio: true },
                  { nome: "email", tipo: "email", label: "Email", obrigatorio: true },
                  { nome: "competencias", tipo: "text", label: "Competências", obrigatorio: true },
                  
                  { nome: "password", tipo: "password", label: "Password", obrigatorio: true },
                  { nome: "confirmarPassword", tipo: "password", label: "Confirmar Password", obrigatorio: true }
                ]}
                opcoes={{
                  curso: [
                    { value: "", label: "Escolher" },
                    { value: "informatica", label: "Informática" },
                    { value: "gestao", label: "Gestão" },
                    { value: "ambiente", label: "Ambiente" },
                    { value: "eletrotecnica", label: "Eletrotécnica" }
                  ]
                }}
                onSubmit={(data) => {
                  console.log("Dados do Estudante:", data);
                  alert("Estudante criado com sucesso!");
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardAdminCriarEstudante; 