import Button from "./Button";
import Logo from "./Logo";
import { useNavigate } from "react-router-dom";

const Navbar = ({ logo }) => {
  const navigate = useNavigate();
  const handleLogoClick = () => {
    navigate("/");
  };
  const handleNewsClick = () => {
    navigate("/news");
  };
  const handleCredentialsClick = () => {
    navigate("/credentials");
  };
  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a onClick={handleLogoClick}>
            <Logo logo={logo} />
          </a>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item me-3">
                <Button
                  outlined={false}
                  noColor={true}
                  onClick={handleNewsClick}
                >
                  Notícias
                </Button>
              </li>
              <li className="nav-item me-3">
                <Button outlined={true} onClick={handleCredentialsClick}>
                  Pedir Credenciais
                </Button>
              </li>
              <li className="nav-item">
                <Button outlined={false} onClick={handleLoginClick}>
                  Iniciar Sessão
                </Button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
