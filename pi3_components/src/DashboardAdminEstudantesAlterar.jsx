import React, { useState, useEffect } from "react";
import SidebarAdminEstudante from "./components/admin/SidebarAdminEstudante.jsx";
import Breadcrumb from "./components/Breadcrumb.jsx";
import Alterar from "./components/admin/alterar.jsx";

const DashboardAdminAlterarEstudante = () => {
  const [formData, setFormData] = useState({
    nomeCompleto: "",
    numeroEstudante: "",
    curso: "",
    contactoTelefonico: "",
    email: "",
    competencias: "",
    password: "",
    confirmarPassword: ""
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const estudanteExistente = {
      nomeCompleto: "João Silva",
      numeroEstudante: "123456",
      curso: "informatica",
      contactoTelefonico: "912345678",
      email: "joao@example.com",
      competencias: "JavaScript, React",
      password: "",
      confirmarPassword: ""
    };
    setFormData(estudanteExistente);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = () => {
    const newErrors = {};
    const requiredFields = ["nomeCompleto", "numeroEstudante", "curso", "email"];

    requiredFields.forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = "Campo obrigatório";
      }
    });

    if (formData.password || formData.confirmarPassword) {
      if (formData.password !== formData.confirmarPassword) {
        newErrors.confirmarPassword = "As senhas não coincidem";
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    alert("Estudante atualizado com sucesso!");
    console.log("Dados atualizados:", formData);
  };

  const handleRemover = () => {
    const confirmar = window.confirm("Tens a certeza que queres remover este estudante?");
    if (confirmar) {
      alert("Estudante removido com sucesso!");
      console.log("Estudante removido");
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3 col-lg-2 p-0">
          <SidebarAdminEstudante />
        </div>
        <div className="col-md-9 col-lg-10">
          <div className="container mt-4">
            <div className="row justify-content-center">
              <Breadcrumb />
              <Alterar
                titulo="Alterar"
                subtitulo="Dados Pessoais"
                textoGuardar="Guardar alterações"
                textoRemover="Remover Conta"
                mostrarBotaoRemover={true}
                campos={[
                  { nome: "nomeCompleto", tipo: "text", label: "Nome Completo", obrigatorio: true },
                  { nome: "numeroEstudante", tipo: "text", label: "Número Mecanográfico", obrigatorio: true },
                  { nome: "curso", tipo: "select", label: "Curso", obrigatorio: true },
                  { nome: "contactoTelefonico", tipo: "text", label: "Contacto Telefónico", obrigatorio: true },
                  { nome: "email", tipo: "email", label: "Email", obrigatorio: true },
                  { nome: "competencias", tipo: "text", label: "Competências", obrigatorio: true },
                  { nome: "password", tipo: "password", label: "Nova Password", obrigatorio: false },
                  { nome: "confirmarPassword", tipo: "password", label: "Confirmar Password", obrigatorio: false }
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
                valoresIniciais={formData}
                onChange={handleChange}
                onSubmit={handleSubmit}
                onRemover={handleRemover}
                erros={errors}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardAdminAlterarEstudante;
