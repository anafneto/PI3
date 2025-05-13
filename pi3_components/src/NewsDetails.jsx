import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Breadcrumb from "./components/Breadcrumb";

function NewsDetails() {
  const { id } = useParams();
  const [newsData, setNewsData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      //isto é uma simulação de um fetch à base de dados, dps troquem por um fetch real
      const mockData = {
        title: "Projeto Sustentável em Parceria com Empresas Locais",
        date: "20/03/2025",
        time: "14h29",
        description:
          "Num esforço para fomentar a sustentabilidade e impulsionar o crescimento econômico local, um novo projeto colaborativo foi lançado em parceria com diversas empresas da região. A iniciativa visa promover práticas ecológicas, incentivar a economia circular e sensibilizar a comunidade para a importância da responsabilidade ambiental. Através desta parceria, as empresas envolvidas comprometeram-se a adotar medidas mais sustentáveis nos seus processos de produção, reduzir a pegada de carbono e integrar soluções inovadoras que minimizem o desperdício. Além disso, estão previstas ações de sensibilização, workshops e formações para empresários, colaboradores e cidadãos interessados em adotar hábitos mais ecológicos no seu dia a dia.",
        images: [
          "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png",
          "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png",
        ],
      };
      setNewsData(mockData);
    };

    fetchData();
  }, [id]);

  if (!newsData) {
    return <p>Carregando...</p>;
  }

  return (
    <div className="container-sm mt-3 pb-5 px-5">
      <Breadcrumb />
      <div className="row justify-content-center">
        <h1 className="mb-3">{newsData.title}</h1>

        <p className="text-muted">
          {newsData.date} {newsData.time}
        </p>
        <p>{newsData.description}</p>
        <div className="row mt-4">
          {newsData.images.map((image, index) => (
            <div className="col-md-6" key={index}>
              <img
                src={image}
                alt={`Imagem ${index + 1}`}
                className="img-fluid rounded"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default NewsDetails;