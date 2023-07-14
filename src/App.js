import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { About } from "./components/About";
import { Home } from "./components/Home";
import { Navbar } from "./components/Navbar";
import NoteState from "./context/notes/NoteState";
import Login from "./components/Login";
import Signup from "./components/Signup";
import "./components/navbar.css";
import Alert from "./components/Alert";

function App() {
  const [alert, setAlert] = useState(null);

  const showAlert = (type, message) => {
    setAlert({
      msg: message,
      type: type,
    });

    setTimeout(() => {
      setAlert(null);
    }, 2000);
  };

  return (
    <NoteState>
      <Router>
        <div className="App">
          <Navbar showAlert={showAlert} />
          <Alert alert={alert} />
          <Switch>
            <Route key={"about"} exact path="/about">
              <About />
            </Route>
            <Route key={"home"} exact path="/">
              <Home />
            </Route>
            <Route key={"login"} exact path="/login">
              <Login showAlert={showAlert} />
            </Route>
            <Route key={"signup"} exact path="/signup">
              <Signup showAlert={showAlert} />
            </Route>
          </Switch>
        </div>
      </Router>
    </NoteState>
  );
}

export default App;
