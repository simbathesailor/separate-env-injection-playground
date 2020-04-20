import * as React from "react";
import logo from "./logo.svg";
import "./App.css";
import * as AllTheEnvs from "./consts";

function App() {
  console.log(process.env.NODE_ENV);

  console.log(process.env["REACT_APP_PARAM_THREE"]);
  // if(process.env.NODE_ENV === "MY_DESIRED") {

  // }
  // console.log("All the envs", JSON.stringify(AllTheEnvs, null, 2));
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
    </div>
  );
}

export default App;
