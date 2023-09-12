import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import useNav from "./useNav";

function Links() {
  const { navValue } = useNav(true);
  return (
    <div className="Links">
      <div className="main">
        <Header navValue={navValue} />
        <h1 className="Links__header">Links</h1>

        <p>You can reach me using any of the following links.</p>
        <a
          className="bodyNavLink"
          href="https://twitter.com/bonu_samuel"
          target="_blank"
        >
          <span className="linkLines"></span>
          <span className="linkLinesText">Twitter</span>
        </a>
        <a
          className="bodyNavLink"
          href="https://github.com/B2N10X30"
          target="_blank"
        >
          <span className="linkLines"></span>
          <span className="linkLinesText">Github</span>
        </a>
        <a
          className="bodyNavLink"
          href="https://www.linkedin.com/in/bonu-samuel-371726202"
          target="_blank"
        >
          <span className="linkLines"></span>
          <span className="linkLinesText">LinkedIn</span>
        </a>
        <a
          className="bodyNavLink"
          href="https://drive.google.com/file/d/1ULLx60SzyUKj3VLB6XBPFkCQzZq6K8nr/view"
          target="_blank"
        >
          <span className="linkLines"></span>
          <span className="linkLinesText">Resume</span>
        </a>
        <a
          className="bodyNavLink"
          href="mailto:samuelbonux10@gmail.com"
          target="_blank"
        >
          <span className="linkLines"></span>
          <span className="linkLinesText">E-mail</span>
        </a>
      </div>
      <Footer navValue={navValue} />
    </div>
  );
}

export default Links;
