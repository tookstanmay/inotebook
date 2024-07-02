// jshint esversion: 6

import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const Signup = (props) => {
  const { showAlert } = props;
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  let history = useHistory();

  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (credentials.password.length < 6) {
      return showAlert("danger", "Password length must be more than 6 characters!");
    }

    else if (credentials.password !== credentials.confirmPassword) {
      return showAlert("danger", "Passwords don't match!");
    }

    const host = "http://localhost:5000";

    const url = `${host}/api/auth/createuser`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: credentials.name,
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
      console.log(success, json);
    } else {
      showAlert("danger", error);
    }
  };

  return (
    <div className="margin">
      <form action="" className="signup-form" onSubmit={handleSubmit}>
        <div className="signup-form-containers">
          <label htmlFor="name" className="signup-labels">
            Name
          </label>
          <input
            className="signup-input"
            onChange={onChange}
            type="text"
            name="name"
            id="name"
            spellCheck="false"
            autoComplete="off"
            minLength={3}
            required
          />
        </div>
        <div className="signup-form-containers">
          <label htmlFor="email" className="signup-labels">
            Email
          </label>
          <input
            className="signup-input"
            onChange={onChange}
            type="email"
            name="email"
            id="email"
            spellCheck="false"
            autoComplete="off"
            minLength={3}
            required
          />
        </div>
        <div className="signup-form-containers">
          <label htmlFor="password" className="signup-labels">
            Password
          </label>
          <input
            className="signup-input"
            onChange={onChange}
            type="password"
            name="password"
            id="password"
            spellCheck="false"
            autoComplete="off"
            minLength={3}
            required
          />
        </div>
        <div className="signup-form-containers">
          <label htmlFor="confirmPassword" className="signup-labels">
            Confirm Password
          </label>
          <input
            className="signup-input"
            onChange={onChange}
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            spellCheck="false"
            autoComplete="off"
            minLength={3}
            required
          />
        </div>
        <div className="signup-form-containers">
          <button id="signupBtn">Sign up</button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
