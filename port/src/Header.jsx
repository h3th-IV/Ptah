import React from "react";
import { Link } from "react-router-dom";

function Header(props) {
  return (
    <div className="Header">
      {!props.navValue && (
        <nav>
          <h1 className="logo">Th0th_IV</h1>
        </nav>
      )}
      <div className="stack_cont">
        {props.navValue && (
          <Link to="/" className="backBtn">
            ← Go back
          </Link>
        )}
        {!props.navValue && (
          <div className="stack">cyber-security&nbsp; engineer</div>
        )}
      </div>
    </div>
  );
}

export default Header;
