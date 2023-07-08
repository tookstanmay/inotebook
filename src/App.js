import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { About } from "./components/About";
import { Home } from "./components/Home";
import { Navbar } from "./components/Navbar";
import NoteState from "./context/notes/NoteState";

function App() {
  return (
    <NoteState>
      <Router>
        <div className="App">
          <Navbar />
          <Switch>
            <Route key={"about"} exact path="/about">
              <About />
            </Route>
            <Route key={"home"} exact path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>
    </NoteState>
  );
}

export default App;
