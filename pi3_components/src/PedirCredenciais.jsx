import React from "react";
import { Link } from "react-router-dom";
import Breadcrumb from "./components/Breadcrumb";
import EmpresaForm from "./components/credenciaisForms/EmpresaForm";
import EstudanteForm from "./components/credenciaisForms/EstudanteForm";

const PedirCredenciais = () => {
    return (
        <div className="container-sm mt-3 pb-5 px-5">
            <Breadcrumb />
            <div className="row justify-content-center mx-5">
            <EmpresaForm />
                <div className="col-auto d-flex align-items-stretch mx-4">
                    <div
                        className="vr"
                        style={{ width: "2px", backgroundColor: "#adb5bd" }}
                    ></div>
                </div>
                <EstudanteForm />
            </div>
        </div>
    );
};

export default PedirCredenciais;