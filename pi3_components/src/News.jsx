import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { useNavigate } from "react-router-dom";
import BigCardNews from "./components/BigCardNews"; // Importando o componente

function News() {
  const navigate = useNavigate();

  const handleCardClick = (id) => {
    navigate(`/news/${id}`);
  };
  
  return (
    <div className="container mt-5">
      <div onClick={() => handleCardClick(1)} style={{ cursor: "pointer" }}>
        <BigCardNews />
      </div>
    </div>
  );
}

export default News;