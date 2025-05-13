import { useNavigate } from "react-router-dom";

// Button component
const Button = ({ noColor, onClick, outlined, children }) => {
  return (
    <>
      {noColor ? (
        <button type="button" className="btn btn-sm" onClick={onClick}>
          {children}
        </button>
      ) : outlined ? (
        <button
          type="button"
          className="btn btn-outline-dark btn-sm"
          onClick={onClick}
        >
          {children}
        </button>
      ) : (
        <button type="button" className="btn btn-dark btn-sm" onClick={onClick}>
          {children}
        </button>
      )}
    </>
  );
};

// Logo component
const Logo = ({ logo, onClick }) => {
  return (
    <>
      <nav className="navbar navbar-light bg-light">
        <a className="navbar-brand" onClick={onClick}>
          <img src={logo} width="237px" height="32px" alt="" flex-shrink="0" />
        </a>
      </nav>
    </>
  );
};

// Navbar component
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
        <div className="container-fluid mx-4">
          <Logo logo={logo} onClick={handleLogoClick} />
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item me-1">
                <Button
                  outlined={false}
                  noColor={true}
                  onClick={handleNewsClick}
                >
                  Notícias
                </Button>
              </li>
              <li className="nav-item me-1">
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