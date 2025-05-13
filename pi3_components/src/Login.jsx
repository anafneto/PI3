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
    <div className="container-sm mt-3 pb-5 px-5">
      <Breadcrumb />
      <div className="row justify-content-center mt-5">
        <LoginFeatures />
        <div className="col-auto d-flex align-items-stretch mx-4">
          <div
            className="vr"
            style={{ width: "2px", backgroundColor: "#adb5bd" }}
          ></div>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}

export default Login;