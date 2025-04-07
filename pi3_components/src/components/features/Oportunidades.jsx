import React from "react";
import "../../App.css"; 

const CardList = ({ cards }) => {
  return (
    <div className="cardop-container">
      {cards.map((card, index) => (
        <div key={index} className={`cardop ${card.size === "small1" ? "cardop-small1" : ""} ${card.size === "big1" ? "cardop-big1" : ""} ${card.size === "big2" ? "cardop-big2" : ""} ${card.size === "big3" ? "cardop-big3" : ""} ${card.size === "small2" ? "cardop-small2" : ""}`}>
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
