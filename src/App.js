import * as React from "react";
import logo from "./logo.svg";
import "./App.css";
// import * as AllTheEnvs from "./consts";

// const getTHreeParamValue = () => {
//   const a = process.env["REACT_APP_PARAM_THREE"];
//   return () => {
//     return process.env["REACT_APP_PARAM_THREE"];
//   };
// };
function App() {
  console.log(process.env.NODE_ENV);

  console.log(process.env["REACT_APP_PARAM_THREE"]);
  // if(process.env.NODE_ENV === "MY_DESIRED") {

  // }
  // console.log("All the envs", JSON.stringify(AllTheEnvs, null, 2));

  // "I AM PARAM THREE" ===
  // function() {
  //   return "$$_INTERNAL__process.env.REACT_APP_PARAM_THREE$$_INTERNAL__";
  // } && o.createElement("p", null, "COnditional got rendered")
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
