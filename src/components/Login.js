// jshint esversion: 6

import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./navbar.css";

const Login = (props) => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const { showAlert } = props;
  let history = useHistory();

  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const host = "http://localhost:5000";

    const url = `${host}/api/auth/login`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();

    const success = json.success;
    const error = json.error;
    if (success) {
      // save authToken and redirect
      localStorage.setItem("token", json.authToken);
      history.push("/");
    } else {
      showAlert("danger", error);
    }
  };
  return (
    <div className="margin">
      <form action="" className="login-form" onSubmit={handleSubmit}>
        <div className="login-form-containers">
          <label htmlFor="email" className="login-labels">
            Email
          </label>
          <input
            className="login-input"
            onChange={onChange}
            value={credentials.email}
            type="email"
            name="email"
            id="email"
            spellCheck="false"
            autoComplete="off"
          />
        </div>
        <div className="login-form-containers">
          <label htmlFor="password" className="login-labels">
            Password
          </label>
          <input
            className="login-input"
            onChange={onChange}
            value={credentials.password}
            type="password"
            name="password"
            id="password"
            spellCheck="false"
            autoComplete="off"
            required
          />
        </div>
        <div className="login-form-containers">
          <button id="loginBtn">Login</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
