import LoginFeatures from "./components/login/LoginFeatures";
import LoginForm from "./components/login/LoginForm";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "./components/Breadcrumb";


function Login() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/credenciais");
  };
  return (
    <div className="container-sm mt-3 pb-5">
      <Breadcrumb
          paths={[
            { label: "Início", href: "/" },
            { label: "Login" },
          ]}
        />
      <div className="row justify-content-center">
        <LoginFeatures onClick={handleClick} />
        <LoginForm />
      </div>
    </div>
  );
}

export default Login;
