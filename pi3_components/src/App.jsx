import React from "react";
import Homepage from "./Homepage";

function App() {
  return (
    <>
      <div className="page-container">
        <div className="content-wrap">
          <Navbar onClickLogin={() => setTest(true)} logo={logo}></Navbar>
          <Hero
            title="Plataforma de Emprego e Oportunidades"
            info1content={info1content}
            info1title={info1title}
            info2content={info2content}
            info2title={info2title}
            info3content={info3content}
            info3title={info3title}
          >
            {heroContent}
          </Hero>
          <CardNews />
          <HomeOportunidades />
        </div>
      </div>
      <Footer contactInfo={contactInfo} socialLinks={socialLinks} />
    </>
  );
}

export default App;
