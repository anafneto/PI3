import React from "react";
import CardList from "./oportunidades";

const HomeOportunidades = () => {
  const cardData = [
    {
      icon: "🔔",
      title: "Alertas de Novas Oportunidades",
      description: "Recebe notificações sempre que uma nova oferta de emprego ou estágio adequada ao teu perfil for publicada."
      
    },
    {
      icon: "✨",
      title: "Ofertas Exclusivas ESTGV",
      description: "Consulta ofertas de emprego e estágio exclusivas para alunos e ex-alunos da escola.",
      size: "small",
    },
    {
      icon: "💼",
      title: "Empresas a Recrutar",
      description: "Acede a uma rede de empresas que procuram talento da ESTGV, prontas para recrutar.",
      size: "small",
    },
   {
      icon: "🔍",
      title: "Pesquisa Inteligente de Ofertas",
      description: "Procura e filtra facilmente as melhores oportunidades de trabalho ou estágio de acordo com o teu perfil e preferências."
    },
    {
      icon: "👤",
      title: "Criação de Perfil Profissional",
      description: "Cria o teu perfil, adiciona as tuas competências para receberes recomendações personalizadas."
    }
  ];

  return (
    <div className="p-4">
      <CardList cards={cardData} />
    </div>
  );
};

export default HomeOportunidades;
