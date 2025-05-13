import React from "react";

const EmpresaForm = () => {
    return (
        <div className="col-4 px-0">
            <h6 className="mb-3 fw-bold">Empresa</h6>
            <form>
                <div className="mb-2">
                    <label htmlFor="nomeEmpresa" className="form-label small">
                        Nome da Empresa{" "}
                        <span className="text-danger" title="Campo obrigatório">
                            *
                        </span>
                    </label>
                    <input
                        type="text"
                        className="form-control form-control-sm"
                        id="nomeEmpresa"
                        required
                        title="Preencha o nome da empresa"
                    />
                </div>
                <div className="mb-2">
                    <label htmlFor="nif" className="form-label small">
                        Número de Identificação Fiscal{" "}
                        <span className="text-danger" title="Campo obrigatório">
                            *
                        </span>
                    </label>
                    <input
                        type="text"
                        className="form-control form-control-sm"
                        id="nif"
                        required
                        pattern="\d{9}"
                        maxLength={9}
                        title="Introduza um NIF com exatamente 9 dígitos numéricos"
                    />
                </div>
                <div className="mb-2">
                    <label htmlFor="localizacao" className="form-label small">
                        Localização{" "}
                        <span className="text-danger" title="Campo obrigatório">
                            *
                        </span>
                    </label>
                    <input
                        type="text"
                        className="form-control form-control-sm"
                        id="localizacao"
                        required
                        title="Indique a localização"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="emailEmpresa" className="form-label small">
                        Email{" "}
                        <span className="text-danger" title="Campo obrigatório">
                            *
                        </span>
                    </label>
                    <input
                        type="email"
                        className="form-control form-control-sm"
                        id="emailEmpresa"
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

export default EmpresaForm;