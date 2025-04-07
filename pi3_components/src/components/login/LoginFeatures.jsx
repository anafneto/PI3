import React from "react";
import buildingSvg from "../../assets/svg/building.svg";
import avatarSvg from "../../assets/svg/avatar.svg";
import pencilSquareSvg from "../../assets/svg/pencil-square.svg";
import journalTextSvg from "../../assets/svg/journal-text.svg";

const LoginFeatures = ({ onClick }) => {
  return (
    <>
      <div className="col-4 offset-1">
        <div className="d-flex align-items-center mb-2">
          <div className="border rounded p-2 me-3">
            <img src={avatarSvg} alt="Avatar" />
          </div>
          <div>
            <h5 className="mb-0 fs-6">Entre com as suas credenciais do IPV</h5>
            <p className="mb-0 small">
              Se não te lembrares pede-as{" "}
              <a href="" onClick={onClick}>
                aqui
              </a>
            </p>
          </div>
        </div>

        <div className="d-flex align-items-center mb-2">
          <div className="border rounded p-2 me-3">
            <img src={buildingSvg} alt="Building" />
          </div>
          <div>
            <h5 className="mb-0 fs-6">Entre com credenciais da sua Empresa</h5>
            <p className="mb-0 small">
              Se não se lembrar peça-as{" "}
              <a href="" onClick={onClick}>
                aqui
              </a>
            </p>
          </div>
        </div>

        <div className="d-flex align-items-center mb-2">
          <div className="border rounded p-2 me-3">
            <img src={pencilSquareSvg} alt="Pencil" />
          </div>
          <div>
            <h5 className="mb-0 fs-6">
              Personaliza o teu perfil com as tuas competências
            </h5>
            <p className="mb-0 small">Diz-nos o que sabes fazer</p>
          </div>
        </div>

        <div className="d-flex align-items-center mb-2">
          <div className="border rounded p-2 me-3">
            <img src={journalTextSvg} alt="Journal" />
          </div>
          <div>
            <h5 className="mb-0 fs-6">Vê ofertas personalizadas</h5>
            <p className="mb-0 small">Podes receber por email também</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginFeatures;
