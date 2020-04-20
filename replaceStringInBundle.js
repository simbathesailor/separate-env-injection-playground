const path = require("path");
const glob = require("glob");

const fs = require("fs");

const envFromParamStore = {
  REACT_APP_PARAM_ONE: "I AM PARAM ONE",

  REACT_APP_PARAM_TWO: "I AM PARAM TWO",

  REACT_APP_PARAM_THREE: "I AM PARAM THREE"
};
// const read = fs.readFileSync("./testbuildfile.js", "utf8");
// console.log("read", read);

const Files = glob.sync("*.js?(.map)", {
  cwd: "./build/static/js"
});

console.log("Files are ==>", Files); // got the files, not need to replace

Files.forEach(fileName => {
  let source = "";
  const pathToCheckAndUpdate = path.join("./build/static/js", fileName);
  console.log("pathToCheckAndUpdate", pathToCheckAndUpdate);
  const read = fs.readFileSync(pathToCheckAndUpdate, "utf8");

  source = read;
  //

  let changed = false;
  const divider = "$$_INTERNAL__";
  const splitSource = source.split(divider);
  source = splitSource
    .reduce((acc, elem) => {
      const splitElem = elem.split(".");
      const isLengthSplitElemValid = splitElem.length === 3;
      if (isLengthSplitElemValid) {
        const [firstVariable, secondVariable, ThirdVariable] = splitElem;
        const isValidFirstVariable = firstVariable.trim() === "process";
        const isValidSecondVariable = secondVariable.trim() === "env";
        const isValidThirdVariable =
          envFromParamStore[ThirdVariable.trim()] !== undefined;

        if (
          isValidFirstVariable &&
          isValidSecondVariable &&
          isValidThirdVariable
        ) {
          acc.push(envFromParamStore[ThirdVariable.trim()]);
          changed = true;
          return acc;
        }
      }
      acc.push(elem);
      return acc;
    }, [])
    .join("");
  if (changed) {
    console.log("source ==> after changed", source);
    fs.writeFileSync(pathToCheckAndUpdate, source);
  }
});
