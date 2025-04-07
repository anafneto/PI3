import React from "react";
import CardList from "./oportunidades";

const HomeOportunidades = () => {
  const cardData = [
    {
      icon: "🔔",
      title: "Alertas de Novas Oportunidades",
      description: "Recebe notificações sempre que uma nova oferta de emprego ou estágio adequada ao teu perfil for publicada.",
      size: "big1"
    },
    {
      icon: "✨",
      title: "Ofertas Exclusivas ESTGV",
      description: "Consulta ofertas de emprego e estágio exclusivas para alunos e ex-alunos da escola.",
      size: "small1"
    },
    {
      icon: "💼",
      title: "Empresas a Recrutar",
      description: "Acede a uma rede de empresas que procuram talento da ESTGV, prontas para recrutar.",
      size: "small2"
    },
   {
      icon: "🔍",
      title: "Pesquisa Inteligente de Ofertas",
      description: "Procura e filtra facilmente as melhores oportunidades de trabalho ou estágio de acordo com o teu perfil e preferências.",
      size: "big2"
    },
    {
      icon: "👤",
      title: "Criação de Perfil Profissional",
      description: "Cria o teu perfil, adiciona as tuas competências para receberes recomendações personalizadas.",
      size: "big3"
    }
  ];

  return (
    <div className="p-5">
      <CardList cards={cardData} />
    </div>
  );
};

export default HomeOportunidades;
