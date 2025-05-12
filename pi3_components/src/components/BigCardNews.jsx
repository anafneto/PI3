import React, { useEffect, useState } from "react";

function BigCardNews() {
  const [newsData, setNewsData] = useState(null);

  useEffect(() => {
        //isto é uma simulação de um fetch à base de dados, dps troquem por um fetch real
        const fetchData = async () => {
      const mockData = {
        title: "Projeto Sustentável em Parceria com Empresas Locais",
        date: "20/03/2025",
        time: "14h29",
        description:
          "Esta é uma breve descrição da notícia. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        image:
          "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png",
      };
      setNewsData(mockData);
    };

    fetchData();
  }, []);

  if (!newsData) {
    return <p>Carregando...</p>;
  }

  return (
    <div className="card mb-3">
      <div className="row g-0">
        <div className="col-md-4 d-flex">
          <img
            src={newsData.image}
            alt="Imagem da notícia"
            className="img-fluid rounded-start w-100"
            style={{
              objectFit: "cover",
              minHeight: "150px",
              height: "100%",
            }}
          />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title fw-bold">{newsData.title}</h5>
            <div className="d-flex">
              <p className="card-text me-3">
                <small className="text-muted">{newsData.date}</small>
              </p>
              <p className="card-text">
                <small className="text-muted">{newsData.time}</small>
              </p>
            </div>
            <p className="card-text">{newsData.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BigCardNews;