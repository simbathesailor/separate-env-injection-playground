const { getOptions } = require("loader-utils");
const babelParser = require("@babel/parser");
const BabelTypeModule = require("@babel/types");
const generator = require("@babel/generator").default;
const traverse = require("@babel/traverse").default;

// So why i am not using plugin, because i need to transform the code
// before the any transform done by babel itself

function T(source) {
  const options = getOptions(this);

  const { exclude, plugins } = options;

  const ast = babelParser.parse(source, {
    sourceType: "module",
    plugins: plugins || ["jsx"]
  });
  let codalo = source;

  traverse(ast, {
    enter(path) {
      // Why doing the ast traverse ?
      // I want to be sure , that the modification is happening
      // only for process.env member Identifiers. There is no
      // way to guarantee that with string parsing.
      if (BabelTypeModule.isMemberExpression(path.node)) {
        console.log("Found it", path.node);
        console.log("property name", path.node.property.name);

        const generatedCode = generator(path.node);

        if (generatedCode.code.startsWith("process.env.")) {
          let paramName = "";
          const Val = generatedCode.code.split(".");
          if (Val[2]) {
            paramName = Val[2].trim();
          }
          const isBlackList =
            exclude.findIndex(blackListedItem => {
              return blackListedItem === paramName;
            }) !== -1;
          if (!isBlackList) {
            path.replaceWith(
              BabelTypeModule.stringLiteral(
                `$$_INTERNAL__${generatedCode.code}$$_INTERNAL__`
              )
            );
            codalo = generator(ast).code;
          }
        }
      }
    }
  });

  return codalo;
}

module.exports = T;
