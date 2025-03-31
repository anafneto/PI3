import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css"; // Import App.css for styles

export const cardData = [ // Export cardData here
  {
    title: "Projeto Sustentável em Parceria com Empresas",
    text: "Some quick example text to build on the card title and make up the bulk of the card's content.",
    image: "https://cdn.pixabay.com/photo/2016/02/01/00/56/news-1172463_640.jpg",
  },
  {
    title: "Programa de Estágios Internacional",
    text: "Some quick example text to build on the card title and make up the bulk of the card's content.",
    image: "https://img.freepik.com/vetores-gratis/fundo-de-estudio-de-noticias-realista_23-2149985612.jpg",
  },
  {
    title: "Fórum de Inovação Tecnológica na ESTGV",
    text: "Some quick example text to build on the card title and make up the bulk of the card's content.",
    image: "https://thumbs.dreamstime.com/b/not%C3%ADcias-34802664.jpg",
  },
  {
    title: "Projeto de Empreendedorismo da ESTGV Recebe Prêmio Nacional",
    text: "Some quick example text to build on the card title and make up the bulk of the card's content.",
    image: "https://media.istockphoto.com/id/1369150014/pt/vetorial/breaking-news-with-world-map-background-vector.jpg?s=612x612&w=0&k=20&c=w7abuLJ3KY6Xom7dzSRFE1MPZJXc5GKcP3pL1gdYvLU=",
  },
  {
    title: "Projeto de Empreendedorismo da ESTGV Recebe Prêmio Nacional",
    text: "Some quick example text to build on the card title and make up the bulk of the card's content.",
    image: "https://img.freepik.com/vetores-gratis/fundo-de-estudio-de-noticias-realista_23-2149985612.jpg",
  },
];
const CardNews = () => {
  return (
    <div className="w-100 mt-4"> {/* Full-width container */}
      <div className="d-flex overflow-auto" style={{ gap: "8px", padding: "0 48px" }}> {}
        {cardData.map((card, index) => (
          <div className="card" style={{ minWidth: "330px", minHeight: "428px" }} key={index}>
            <img
              src={card.image}
              alt={card.title}
              className="card-img-top"
            />
            <div className="card-body">
              <h5 className="card-title">{card.title}</h5>
              <p className="card-text">{card.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardNews;