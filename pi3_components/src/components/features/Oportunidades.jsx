import React from "react";
import "../../App.css"; 

const Card = ({ icon, title, description }) => {
  return (
    <div className="bg-dark text-gray p-6 rounded-xl shadow-lg flex items-center space-x-4">
        <div className="text-3xl flex-shrink-0">{icon}</div>
        <div>
          <h3 className="text-lg font-bold text-white">{title}</h3>
          <p className="text-sm text-white">{description}</p>
        </div>
      </div>
  );
};

const CardList = ({ cards }) => {
  return (
    <div className="cardop-container">
    {cards.map((card, index) => (
      <div key={index} className="cardop">
        <div className="cardop-icon">{card.icon}</div>
        <div>
          <h3 className="cardop-title">{card.title}</h3>
          <p className="cardop-description">{card.description}</p>
        </div>
      </div>
    ))}
  </div>  
  );
};

export default CardList;
