import React, { useState } from 'react';

const Alterar = ({
  titulo = "Editar",
  subtitulo = "Gestor de Departamento",
  labels = {
    nomeCompleto: "Nome Completo",
    departamento: "Departamento",
    email: "Email",
    password: "Password",
    confirmarPassword: "Confirmar Password"
  },
  textoRemover = "Remover Gestor de Departamento",
  textoGuardar = "Guardar alterações",
  opcoesDepartamento = [],
  requiredFields = [],
  mostrarBotaoRemover = true // <-- NOVA PROP
}) => {
  const [formData, setFormData] = useState({
    nomeCompleto: '',
    departamento: '',
    email: '',
    password: '',
    confirmarPassword: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const isRequired = (field) => requiredFields.includes(field);

  const validate = () => {
    const newErrors = {};

    requiredFields.forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = 'Campo obrigatório';
      }
    });

    if (formData.password && formData.confirmarPassword && formData.password !== formData.confirmarPassword) {
      newErrors.confirmarPassword = 'As senhas não coincidem';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log('Dados enviados:', formData);
      alert('Alterações salvas com sucesso!');
    }
  };

  const handleRemover = () => {
    console.log('Gestor removido');
    alert('Gestor removido!');
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '500px' }}>
      <h4 className="text-center fw-bold">{titulo}</h4>
      <p className="text-center text-muted mb-4">{subtitulo}</p>
      <form onSubmit={handleSubmit}>
        {/* Nome Completo */}
        <div className="mb-3">
          <label className="form-label">
            {labels.nomeCompleto} {isRequired("nomeCompleto") && <span className="text-danger">*</span>}
          </label>
          <input
            type="text"
            className={`form-control ${errors.nomeCompleto ? 'is-invalid' : ''}`}
            name="nomeCompleto"
            value={formData.nomeCompleto}
            onChange={handleChange}
          />
          {errors.nomeCompleto && <div className="invalid-feedback">{errors.nomeCompleto}</div>}
        </div>

        {/* Departamento */}
        <div className="mb-3">
          <label className="form-label">
            {labels.departamento} {isRequired("departamento") && <span className="text-danger">*</span>}
          </label>
          <select
            className={`form-select ${errors.departamento ? 'is-invalid' : ''}`}
            name="departamento"
            value={formData.departamento}
            onChange={handleChange}
          >
            <option value="">Escolher</option>
            {opcoesDepartamento.map((opcao, index) => (
              <option key={index} value={opcao.value}>
                {opcao.label}
              </option>
            ))}
          </select>
          {errors.departamento && <div className="invalid-feedback">{errors.departamento}</div>}
        </div>

        {/* Email */}
        <div className="mb-3">
          <label className="form-label">
            {labels.email} {isRequired("email") && <span className="text-danger">*</span>}
          </label>
          <input
            type="email"
            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <div className="invalid-feedback">{errors.email}</div>}
        </div>

        {/* Password */}
        <div className="mb-3">
          <label className="form-label">
            {labels.password} {isRequired("password") && <span className="text-danger">*</span>}
          </label>
          <input
            type="password"
            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <div className="invalid-feedback">{errors.password}</div>}
        </div>

        {/* Confirmar Password */}
        <div className="mb-4">
          <label className="form-label">
            {labels.confirmarPassword} {isRequired("confirmarPassword") && <span className="text-danger">*</span>}
          </label>
          <input
            type="password"
            className={`form-control ${errors.confirmarPassword ? 'is-invalid' : ''}`}
            name="confirmarPassword"
            value={formData.confirmarPassword}
            onChange={handleChange}
          />
          {errors.confirmarPassword && <div className="invalid-feedback">{errors.confirmarPassword}</div>}
        </div>

        <div className={`d-flex ${mostrarBotaoRemover && textoRemover ? 'justify-content-between' : 'justify-content-end'}`}>
          {mostrarBotaoRemover && textoRemover && (
            <button
              type="button"
              className="btn btn-outline-danger"
              onClick={handleRemover}
            >
              {textoRemover}
            </button>
          )}
          <button type="submit" className="btn btn-dark">
            {textoGuardar}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Alterar;
