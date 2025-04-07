import LoginFeatures from "./components/login/LoginFeatures";
import LoginForm from "./components/login/LoginForm";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/credenciais");
  };
  return (
    <div className="container mt-5">
      <div className="row">
        <LoginFeatures onClick={handleClick} />
        <LoginForm />
      </div>
    </div>
  );
}

export default Login;
