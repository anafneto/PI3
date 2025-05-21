import React, { useState } from 'react';

const Alterar = ({
  titulo,
  subtitulo,
  campos,
  opcoes = {},
  mostrarBotaoRemover = false,
  textoGuardar = 'Guardar',
  textoRemover = 'Remover',
  onSubmit,
  onRemover,
}) => {
  const initialState = campos.reduce((acc, campo) => {
    acc[campo.nome] = campo.tipo === 'checkbox' ? false : '';
    return acc;
  }, {});
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [novaCompetencia, setNovaCompetencia] = useState("");


  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    // Suporte para chips de competências
    if (name === "competencias") {
      setNovaCompetencia(value);
      setErrors((prev) => ({ ...prev, competencias: "" }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value,
      }));
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // Adicionar competência ao array
  const handleAddCompetencia = (e) => {
    e.preventDefault();
    const valor = novaCompetencia.trim();
    if (valor && !formData.competencias?.includes(valor)) {
      setFormData((prev) => ({
        ...prev,
        competencias: [...(prev.competencias || []), valor],
      }));
      setNovaCompetencia("");
    }
  };

  const handleRemoveCompetencia = (valor) => {
    setFormData((prev) => ({
      ...prev,
      competencias: prev.competencias.filter((c) => c !== valor),
    }));
  };

  const validate = () => {
    const newErrors = {};

    campos.forEach((campo) => {
      if (campo.obrigatorio && !formData[campo.nome]) {
        newErrors[campo.nome] = 'Campo obrigatório';
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
      onSubmit?.(formData);
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '600px' }}>
      <h4 className="text-center fw-bold">{titulo}</h4>
      {subtitulo && <p className="text-center text-muted mb-4">{subtitulo}</p>}

      <form onSubmit={handleSubmit}>
        {campos.map((campo) => {
          const erro = errors[campo.nome];
          const valor = formData[campo.nome];

          if (campo.tipo === 'select') {
            return (
              <div className="mb-3" key={campo.nome}>
                <label className="form-label">
                  {campo.label} {campo.obrigatorio && <span className="text-danger">*</span>}
                </label>
                <select
                  className={`form-select ${erro ? 'is-invalid' : ''}`}
                  name={campo.nome}
                  value={valor}
                  onChange={handleChange}
                >
                  {(opcoes[campo.nome] || []).map((opt, i) => (
                    <option key={i} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
                {erro && <div className="invalid-feedback">{erro}</div>}
              </div>
            );
          }

          if (campo.tipo === 'checkbox') {
            return (
              <div className="form-check mb-3" key={campo.nome}>
                <input
                  type="checkbox"
                  className="form-check-input"
                  name={campo.nome}
                  checked={valor}
                  onChange={handleChange}
                />
                <label className="form-check-label">{campo.label}</label>
              </div>
            );
          }

          // Campo especial para competências (chips)
          if (campo.nome === "competencias") {
            return (
              <div className="mb-3" key={campo.nome}>
                <label className="form-label">
                  {campo.label} {campo.obrigatorio && <span className="text-danger">*</span>}
                </label>
                <div className="d-flex mb-2">
                  <input
                    type="text"
                    className={`form-control me-2 ${erro ? 'is-invalid' : ''}`}
                    name="competencias"
                    value={novaCompetencia}
                    onChange={handleChange}
                    placeholder="Adicionar competência"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddCompetencia(e);
                      }
                    }}
                  />

                </div>
                {erro && <div className="invalid-feedback d-block">{erro}</div>}
                <div className="d-flex flex-wrap gap-2 mt-2">
                  {(formData.competencias || []).map((comp, idx) => (
                    <span
                      key={idx}
                      className="badge d-flex align-items-center mt-1"
                      style={{
                        fontSize: "1rem",
                        backgroundColor: "#F5F6F7",
                        color: "#6c757d",
                        border: "1px solid #D3D6D8",
                        fontWeight: "normal",
                      }}
                    >
                      {comp}
                      <button
                        type="button"
                        className="btn-close btn-close-sm ms-2"
                        aria-label="Remover"
                        style={{ fontSize: "0.7em" }}
                        onClick={() => handleRemoveCompetencia(comp)}
                      />
                    </span>

                  ))}
                </div>
              </div>
            );
          }

          return (
            <div className="mb-3" key={campo.nome}>
              <label className="form-label">
                {campo.label} {campo.obrigatorio && <span className="text-danger">*</span>}
              </label>
              <input
                type={campo.tipo}
                className={`form-control ${erro ? 'is-invalid' : ''}`}
                name={campo.nome}
                value={valor}
                onChange={handleChange}
              />
              {erro && <div className="invalid-feedback">{erro}</div>}
            </div>
          );
        })}

        <div className={`d-flex ${mostrarBotaoRemover ? 'justify-content-between' : 'justify-content-end'}`}>
          {mostrarBotaoRemover && (
            <button type="button" className="btn btn-outline-danger" onClick={onRemover}>
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
