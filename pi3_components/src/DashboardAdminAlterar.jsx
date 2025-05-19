import React, { useState } from "react";
import Sidebar from "./components/admin/Sidebar.jsx";
import Breadcrumb from "./components/Breadcrumb";
import Alterar from "./components/admin/Alterar.jsx";

const DashboardAdminAlterar = () => {
  const [formData, setFormData] = useState({
    nomeCompleto: "",
    departamento: "",
    email: "",
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

    alert("Dados salvos com sucesso!");
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
                titulo="Alterar"
                subtitulo="Gestor de Departamento"
                textoRemover="Eliminar Responsável"
                textoGuardar="Salvar"
                labels={{
                  nomeCompleto: "Nome do Responsável",
                  departamento: "Departamento",
                  email: "Email",
                  password: "Nova Password",
                  confirmarPassword: "Repetir Password"
                }}
                formData={formData}
                errors={errors}
                onChange={handleChange}
                onSubmit={handleSubmit}
                opcoesDepartamento={[
                      { value: 'informatica', label: 'Informática' },
                  { value: 'gestao', label: 'Gestão' },
                  { value: 'ambiente', label: 'Ambiente' },
                  { value: 'eletrotecnica', label: 'Eletrotécnica' }
                ]}
                requiredFields={["nomeCompleto", "departamento", "email","password","confirmarPassword"]}
              />
  
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardAdminAlterar;
