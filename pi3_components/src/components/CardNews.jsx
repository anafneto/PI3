import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css"; // Import App.css for styles

const CardNews = () => {
  return (
    <div className="w-100 mt-5"> {/* Full-width container */}
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