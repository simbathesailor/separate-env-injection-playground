const { getOptions } = require("loader-utils");
const babelParser = require("@babel/parser");
const BabelTypeModule = require("@babel/types");
const generator = require("@babel/generator").default;
const traverse = require("@babel/traverse").default;
const toPath = require("lodash.topath");

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
        const generatedCode = generator(path.node);

        const pathArr = toPath(generatedCode.code);
        if (
          pathArr[0] === "process" &&
          pathArr[1] === "env" &&
          pathArr.length === 3
        ) {
          let paramName = "";

          if (pathArr[2]) {
            paramName = pathArr[2].trim();
          }
          const isBlackList =
            exclude.findIndex(blackListedItem => {
              if (blackListedItem === "NODE_ENV") {
                console.log(
                  "now the value is : ==>",
                  blackListedItem,
                  paramName,
                  pathArr
                );
              }
              return blackListedItem === paramName;
            }) !== -1;

          if (!isBlackList) {
            try {
              const MM = BabelTypeModule.templateLiteral(
                [
                  BabelTypeModule.templateElement({
                    raw: `$$_INTERNAL__process.env.${paramName}MATH_RANDOM_START`,
                    cooked: `$$_INTERNAL__process.env.${paramName}MATH_RANDOM_START`
                  }),
                  BabelTypeModule.templateElement({
                    raw: "MATH_RANDOM_END$$_INTERNAL__",
                    cooked: "MATH_RANDOM_END$$_INTERNAL__"
                  })
                ],
                [
                  BabelTypeModule.callExpression(
                    BabelTypeModule.memberExpression(
                      BabelTypeModule.identifier("Math"), // most important part, for confusing
                      //babel not to replace the values in the code
                      BabelTypeModule.identifier("random"),
                      false
                    ),
                    []
                  )
                ]
              );

              path.replaceWith(MM);
            } catch (e) {
              console.log("error is ===>", e);
            }
            codalo = generator(ast).code;
          }
        }
      }
    }
  });

  return codalo;
}

module.exports = T;
