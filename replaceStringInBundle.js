const path = require("path");
const glob = require("glob");
const babelParser = require("@babel/parser");
const BabelTypeModule = require("@babel/types");
const traverse = require("@babel/traverse").default;

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

  // Trial code start
  const extension = path.extname(pathToCheckAndUpdate);
  console.log("extension", extension);

  if (extension === ".js") {
    const ast = babelParser.parse(source, {
      sourceType: "module",
      plugins: ["jsx"]
    });

    traverse(ast, {
      enter(path) {
        if (BabelTypeModule.isStringLiteral(path.node)) {
          console.log(`String is: ==> ${path.node.value}`);

          const MM = BabelTypeModule.stringLiteral();
        }
      }
    });
    console.log("ast ===>", ast);
  }

  // Tria; code end
  //
  // t.split(/\$\$_INTERNAL__|"\$\$_INTERNAL__"/)
  // t.split(/\$\$_INTERNAL__/)
  // m.split(/==>|\]/)
  let changed = false;
  const divider = "$$_INTERNAL__";
  const splitSource = source.split(divider);
  source = splitSource
    .reduce(
      (acc, elem) => {
        let stringToBeReplaced = elem;
        if (acc.remove) {
          // need to replace the extra ) added for concat

          stringToBeReplaced = stringToBeReplaced.replace(/\)/, "");
          // }
          acc.remove = false;
        }
        const ifElementStartsWithProcessEnv = elem.startsWith("process.env.");
        const indexOfMathRandomStart = elem.search("MATH_RANDOM_START");
        if (indexOfMathRandomStart !== -1 && ifElementStartsWithProcessEnv) {
          let temp = elem.slice(indexOfMathRandomStart);
          stringToBeReplaced = stringToBeReplaced.replace(temp, "");

          const splittedString = stringToBeReplaced.split(".");
          const [firstVariable, secondVariable, ThirdVariable] = splittedString;
          const isValidFirstVariable = firstVariable.trim() === "process";
          const isValidSecondVariable = secondVariable.trim() === "env";
          const isValidThirdVariable =
            envFromParamStore[ThirdVariable.trim()] !== undefined;
          if (
            isValidFirstVariable &&
            isValidSecondVariable &&
            isValidThirdVariable
          ) {
            acc.result.push(envFromParamStore[ThirdVariable.trim()]);
            const countOfOpeningBrackets = temp.match(/\(/g);
            const countClosingBrackets = temp.match(/\)/g);
            if (
              countOfOpeningBrackets &&
              countClosingBrackets &&
              countOfOpeningBrackets.length > countClosingBrackets.length
            ) {
              acc.remove = true;
            }

            changed = true;
            return acc;
          }
        }

        acc.result.push(stringToBeReplaced);
        acc.remove = false;
        return acc;
      },
      { result: [], remove: false }
    )
    .result.join("");
  if (changed) {
    console.log("changed done to the ", pathToCheckAndUpdate);
    fs.writeFileSync(pathToCheckAndUpdate, source);
  }
});
