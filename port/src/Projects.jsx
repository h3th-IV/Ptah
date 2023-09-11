import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import useNav from "./useNav";
// import coverlyImg from "./img/coverly.png";
// import metaBnbimg from "./img/meta-bnb.png";
// import amazonCloneImg from "./img/amazon-clone.png";
// import openaiAsk from "./img/openai-ask.png";
// import smapp from "./img/sm-app.png";

function Projects() {
  const { navValue } = useNav(true);
  return (
    <div className="Projects">
      <Header navValue={navValue} />
      <div className="main">
        <h1 className="projects__header">Projects</h1>
        <p className="contribution">
          In development.
        </p>
      </div>
  <Footer navValue={navValue} /> *
      </div>
      );
}

      export default Projects;
