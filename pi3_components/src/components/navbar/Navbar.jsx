import Button from "./Button";
import Logo from "./Logo";

const Navbar = ({ onClickNews, onClickCredentials, onClickLogin, logo }) => {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Logo logo={logo} />
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item me-3">
                <Button outlined={false} noColor={true} onClick={onClickNews}>
                  Notícias  
                </Button>
              </li>
              <li className="nav-item me-3">
                <Button outlined={true} onClick={onClickCredentials}>
                  Pedir Credenciais
                </Button>
              </li>
              <li className="nav-item">
                <Button outlined={false} onClick={onClickLogin}>
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
