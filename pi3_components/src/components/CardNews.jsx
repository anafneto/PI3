import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import { use, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";// Import App.css for styles

const cardData = [
  {
    image: "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png",
    title: "Projeto Sustentável em Parceria com Empresas Locais",
    text: "Num esforço para fomentar a sustentabilidade e impulsionar o crescimento econômico local, um novo projeto colaborativo foi lançado em parceria com diversas empresas da região. A iniciativa visa promover práticas ecológicas, incentivar a economia circular e sensibilizar a comunidade para a importância da responsabilidade ambiental.",
  },
  {
    image: "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png",
    title: "Projeto Sustentável em Parceria com Empresas Locais",
    text: "Num esforço para fomentar a sustentabilidade e impulsionar o crescimento econômico local, um novo projeto colaborativo foi lançado em parceria com diversas empresas da região. A iniciativa visa promover práticas ecológicas, incentivar a economia circular e sensibilizar a comunidade para a importância da responsabilidade ambiental.",
  },
  {
    image: "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png",
    title: "Projeto Sustentável em Parceria com Empresas Locais",
    text: "Num esforço para fomentar a sustentabilidade e impulsionar o crescimento econômico local, um novo projeto colaborativo foi lançado em parceria com diversas empresas da região. A iniciativa visa promover práticas ecológicas, incentivar a economia circular e sensibilizar a comunidade para a importância da responsabilidade ambiental.",
  },
  {
    image: "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png",
    title: "Inovação Tecnológica na Indústria Automotiva",
    text: "A indústria automotiva está passando por uma revolução tecnológica, com o surgimento de veículos elétricos e autônomos. As empresas estão investindo em pesquisa e desenvolvimento para criar soluções mais eficientes e sustentáveis.",
  },
  // Adicione mais objetos conforme necessário
];

function News() {
  const [noticias, setNoticias] = UseState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("https://api.example.com/news")
      .then(response => {
        setNoticias(response.data);
      }
      )
      .catch(error => {
        console.error("Erro ao buscar notícias:", error);
      });
  }
    , []);
}


const CardNews = () => {
  return (
    <div className="w-100 mt-5"> {/* Full-width container */}
      <div className="d-flex overflow-auto" style={{ gap: "8px", padding: "0 48px" }}> { }
        {cardData.map((card, index) => (
          <div className="card" style={{ minWidth: "330px" }} key={index}>
            <img
              src={card.image}
              alt={card.title}
              className="card-img-top"
            />
            <div className="card-body">
              <h5 className="card-title">{card.title}</h5>
              <p className="card-text" style={{
                display: "-webkit-box",
                WebkitLineClamp: 3,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                textOverflow: "ellipsis",
                fontSize: "0.8em",
                lineHeight: "1.4"
              }}>{card.text}</p>
              <div>
                <small className="text-muted">Leia mais »</small>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardNews;