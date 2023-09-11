import React from "react";
import { Link } from "react-router-dom";

function HomeBodyLink(props) {
  return (
    <Link to={`/${props.to}`} className="bodyNavLink">
      <span className="linkLines"></span>
      <span className="linkLinesText">{props.text}</span>
    </Link>
  );
}

export default HomeBodyLink;
