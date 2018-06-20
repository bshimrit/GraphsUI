import React from "react";
import ReactDOM from "react-dom";

import Graph from "./GraphComp";

import "./styles.css";

function App() {
  return (
    <div className="App">
      <Graph />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
