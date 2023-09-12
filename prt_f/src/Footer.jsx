import React from "react";

function Footer(props) {
  return (
    <div>
      {props.navValue && (
        <div className="Footer">
          &#169; {new Date().getFullYear()} Th0th_IV.
        </div>
      )}
    </div>
  );
}

export default Footer;
