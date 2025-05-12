import React from "react";

const Hero = ({
  info1content,
  info1title,
  info2content,
  info2title,
  info3content,
  info3title,
  title,
  children,
}) => {
  return (
    <div className="hero-container">
      <div className="hero-content">
        <h1>{title}</h1>
        <p className="hero-description">{children}</p>
      </div>
      <div className="hero-info">
        <div className="hero-info-item">
          <span className="hero-info-content">{info1content}</span>
          <span className="hero-info-title">{info1title}</span>
        </div>
        <div className="hero-info-divider" />
        <div className="hero-info-item">
          <span className="hero-info-content">{info2content}</span>
          <span className="hero-info-title">{info2title}</span>
        </div>
        <div className="hero-info-divider" />
        <div className="hero-info-item">
          <span className="hero-info-content">{info3content}</span>
          <span className="hero-info-title">{info3title}</span>
        </div>
      </div>
    </div>
  );
};

export default Hero;