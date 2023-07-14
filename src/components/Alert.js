// jshint esversion: 6

import React from "react";
import "./navbar.css";

const Alert = (props) => {
  const { alert } = props;
  return (
    alert && (
      <div className={`alert alert-${alert.type}`}>
        <img
          style={{ height: "17px", margin: "0 10px 0 10px" }}
          src={`../images/${alert.type}.png`}
          alt=""
        />
        <span className="alert-message">{alert.msg}</span>
      </div>
    )
  );
};

export default Alert;
