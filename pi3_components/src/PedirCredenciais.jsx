import React from "react";
import { Link } from "react-router-dom";
import Breadcrumb from "./components/Breadcrumb";

const PedirCredenciais = () => {
  return (
    <div className="container-sm mt-3 pb-5">
      <div className="row justify-content-center">
        <Breadcrumb
          paths={[
            { label: "Início", href: "/" },
            { label: "Pedir Credenciais" },
          ]}
        />
        <div className="col-4">
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
                title="Preencha o NIF"
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

        <div className="col-auto d-flex align-items-stretch mx-4">
          <div
            className="vr"
            style={{ width: "2px", backgroundColor: "#adb5bd" }}
          ></div>
        </div>

        <div className="col-4">
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
                title="Introduza o número de telefone"
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
      </div>
    </div>
  );
};

export default PedirCredenciais;
