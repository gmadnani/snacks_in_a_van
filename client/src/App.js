import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';

import Navbar from "./components/navbar_component";
import Register from "./components/authentication/Register";
import Login from "./components/authentication/Login";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar/>
        <Route exact path="/register"component={Register} />
        <Route exact path="/login"component={Login} />
      </div>
    </Router>
    
  );
}

export default App;
