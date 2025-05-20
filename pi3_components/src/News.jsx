import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { useNavigate } from "react-router-dom";
import BigCardNews from "./components/BigCardNews"; 
import Breadcrumb from "./components/Breadcrumb";

function News() {
  const navigate = useNavigate();

  const handleCardClick = (id) => {
    navigate(`/noticias/${id}`);
  };
  
  return (
    <div className="container-sm mt-3 pb-5 px-5">
      <Breadcrumb />
      <div className="row justify-content-center">
      <div onClick={() => handleCardClick(1)} style={{ cursor: "pointer" }}>
        <BigCardNews />
      </div>
    </div>
    </div>
  );
}

export default News;