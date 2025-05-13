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
    </div>
  );
};

export default Hero;