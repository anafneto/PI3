import React from "react";

const EstudanteForm = () => {
    return (
        <div className="col-4 px-0">
            <h6 className="mb-3 fw-bold">Estudante/Diplomado</h6>
            <form>
                <div className="mb-2">
                    <label htmlFor="nomeCompleto" className="form-label small">
                        Nome Completo{" "}
                        <span className="text-danger" title="Campo obrigatório">
                            *
                        </span>
                    </label>
                    <input
                        type="text"
                        className="form-control form-control-sm"
                        id="nomeCompleto"
                        required
                        title="Preencha o nome completo"
                    />
                </div>
                <div className="mb-2">
                    <label
                        htmlFor="numMecanografico"
                        className="form-label small"
                    >
                        Número Mecanográfico
                    </label>
                    <input
                        type="text"
                        className="form-control form-control-sm"
                        id="numMecanografico"
                        pattern="\d{5}"
                        maxLength={5}
                        title="Introduza exatamente 5 dígitos numéricos"
                    />
                </div>
                <div className="mb-2">
                    <label htmlFor="curso" className="form-label small">
                        Curso{" "}
                        <span className="text-danger" title="Campo obrigatório">
                            *
                        </span>
                    </label>
                    <select
                        className="form-select form-select-sm"
                        id="curso"
                        required
                        title="Escolha o curso"
                    >
                        <option value="">Escolher</option>
                        <option value="tdm">TDM</option>
                        <option value="ei">EI</option>
                    </select>
                </div>
                <div className="mb-2">
                    <label htmlFor="contacto" className="form-label small">
                        Contacto Telefónico{" "}
                        <span className="text-danger" title="Campo obrigatório">
                            *
                        </span>
                    </label>
                    <input
                        type="tel"
                        className="form-control form-control-sm"
                        id="contacto"
                        required
                        pattern="\d{9}"
                        maxLength={9}
                        title="Introduza um número de telefone com exatamente 9 dígitos"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="emailEstudante" className="form-label small">
                        Email{" "}
                        <span className="text-danger" title="Campo obrigatório">
                            *
                        </span>
                    </label>
                    <input
                        type="email"
                        className="form-control form-control-sm"
                        id="emailEstudante"
                        required
                        title="Insira um email válido"
                    />
                </div>
                <button
                    type="submit"
                    className="btn w-100"
                    style={{ backgroundColor: "#444644", color: "white" }}
                >
                    Submeter Pedido
                </button>
            </form>
        </div>
    );
};

export default EstudanteForm;