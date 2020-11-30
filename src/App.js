import * as React from "react";
import logo from "./logo.svg";
import "./App.css";
import { SOMEPARAM, V1 } from "./consts";
console.log("🚀 ~ file: App.js ~ line 5 ~ V1", V1);

console.log("SOMEPARAM outside", SOMEPARAM);

function App() {
  console.log(process.env.NODE_ENV);
  console.log("SOMEPARAM inside", SOMEPARAM);

  console.log(process.env["REACT_APP_PARAM_THREE"]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>

      {process.env["REACT_APP_PARAM_THREE"] === "I AM PARAM THREE" && (
        <p>COnditional got rendered</p>
      )}
    </div>
  );
}

export default App;
