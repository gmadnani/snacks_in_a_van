import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import './App.css';
import Navbar from "./components/navbar_component";

function App() {
  return (
    <div className="App">
      <Router>
      <Navbar/>
      </Router>
    </div>
  );
}

export default App;
