import * as React from "react";
import logo from "./logo.svg";
import "./App.css";
import { SOMEPARAM, V1 } from "./consts";
console.log("🚀 ~ file: App.js ~ line 5 ~ V1", V1);

console.log("SOMEPARAM outside", SOMEPARAM);

const { PUBLIC_URL_TWO } = process.env;
console.log("🚀 ~ file: App.js ~ line 10 ~ PUBLIC_URL_TWO", PUBLIC_URL_TWO);

const { REACT_APP_PARAM_TWO: hello } = process.env;
console.log("🚀 ~ file: App.js ~ line 12 ~ hello", hello);

// const { env } = process;

// const { REACT_APP_PARAM_THREE: threeVar } = env;
// console.log("🚀 ~ file: App.js ~ line 18 ~ threeVar", threeVar);

// var PUBLIC_URL_TWO = process.env.PUBLIC_URL_TWO;
// console.log("🚀 ~ file: App.js ~ line 10 ~ PUBLIC_URL_TWO", PUBLIC_URL_TWO);
// var hello = process.env.REACT_APP_PARAM_TWO;
// console.log("🚀 ~ file: App.js ~ line 12 ~ hello", hello);
// var _process = process,
//   env = _process.env;
// var threeVar = env.REACT_APP_PARAM_THREE;
// console.log("🚀 ~ file: App.js ~ line 18 ~ threeVar", threeVar);

// eslint-disable-next-line no-undef
console.log("My Secret in App.js ==>", MY_SECRET_VALUE);
/**
 * var PUBLIC_URL_TWO = process.env.PUBLIC_URL_TWO;
console.log("🚀 ~ file: App.js ~ line 10 ~ PUBLIC_URL_TWO", PUBLIC_URL_TWO);
var hello = process.env.REACT_APP_PARAM_TWO;
console.log("🚀 ~ file: App.js ~ line 12 ~ hello", hello);
var _process = process,
    env = _process.env;
var threeVar = env.REACT_APP_PARAM_THREE;
console.log("🚀 ~ file: App.js ~ line 18 ~ threeVar", threeVar);
 */

function App() {
  console.log(process.env.NODE_ENV);
  console.log("SOMEPARAM inside", SOMEPARAM);

  console.log(process.env["REACT_APP_PARAM_THREE"]);

  console.log(`Hello I am template literal ${process.env.REACT_APP_PARAM_TWO}`);

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
