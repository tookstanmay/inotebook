// jshint esversion: 6

import React from "react";

const Alert = (props) => {
  return (
    <div style={{ height: "50px" }}>
      {props.alert && (
        <div
          className={`d-flex align-items-center justify-content-left alert alert-${props.alert.type} alert-dismissible fade show`}
          role="alert"
        >
          <img
            src={`${props.alert.type}.png`}
            style={{ height: "25px", margin: "0 10px" }}
            alt=""
          />
          {props.alert.msg}
        </div>
      )}
    </div>
  );
};

export default Alert;
