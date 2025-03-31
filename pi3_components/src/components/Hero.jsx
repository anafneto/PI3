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
      <h1>{title}</h1>
      {children}
      <div className="hero-container-info">
        <div>
          {info1content}
          <br />
          {info1title}
        </div>
        {info2content && <div className="hero-container-info-divider" />}
        <div>
          {info2content}
          <br />
          {info2title}
        </div>
        {info3content && <div className="hero-container-info-divider" />}
        <div>
          {info3content}
          <br />
          {info3title}
        </div>
      </div>
    </div>
  );
};

export default Hero;

/* CSS down below

.hero-container {
  width: 100%;
  height: 274px;
  flex-shrink: 0;
  background: #444644;
  padding: 48px;
  position: relative;

  color: var(--Gray-White, #fff);
  font-family: "Rubik", sans-serif;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
}

@media screen and (max-width: 768px) {
  .hero-container {
    height: 500px;
  }
}

.hero-container h1 {
  color: var(--Gray-White, #fff);
  font-family: "Rubik", sans-serif;
  font-size: 45px;
  font-style: normal;
  font-weight: 600;
  line-height: 99%;
}

.hero-container-info {
  display: flex;
  align-items: center;
  gap: 8px;
  justify-self: flex-end;
  position: absolute;
  bottom: 48px;
  right: 48px;

  color: var(--Gray-White, #fff);
  font-family: "Rubik", sans-serif;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
}

.hero-container-info-divider {
  width: 2px;
  height: 38px;
  background: #fff;
}

*/
