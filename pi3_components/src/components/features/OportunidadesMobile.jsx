import React from "react";
import "../../App.css"; 

const CardList = ({ cards }) => {
  return (
    <div className="cardop-containerMobile">
      {cards.map((card, index) => (
        <div key={index} className={`cardopMobile ${card.size === "big1"}`}>
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
