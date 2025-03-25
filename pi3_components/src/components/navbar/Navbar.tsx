import { useState } from "react";
import Button from "./Button";
import Logo from "./Logo";
import BlowUp from "../BestComp";

interface Props {
  logo: string; // Path to image
}

const Navbar = ({ logo }: Props) => {
  const [test, setTest] = useState(false);
  return (
    <>
      {test}
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Logo logo={logo} />
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item me-3">
                <Button
                  outlined={false}
                  noColor={true}
                  onClick={() => setTest(true)}
                >
                  Notícias
                </Button>
              </li>
              <li className="nav-item me-3">
                <Button outlined={true} onClick={() => setTest(true)}>
                  Pedir Credenciais
                </Button>
              </li>
              <li className="nav-item">
                <Button outlined={false} onClick={() => setTest(true)}>
                  Iniciar Sessão
                </Button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {test && <BlowUp />}
    </>
  );
};

export default Navbar;
