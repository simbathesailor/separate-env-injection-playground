const { getOptions } = require("loader-utils");
const babelParser = require("@babel/parser");
const BabelTypeModule = require("@babel/types");
const generator = require("@babel/generator").default;
const traverse = require("@babel/traverse").default;
const toPath = require("lodash.topath");
const template = require("babel-template");

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
  console.log("T -> codalo", codalo);

  traverse(ast, {
    enter(path) {
      // Why doing the ast traverse ?
      // I want to be sure , that the modification is happening
      // only for process.env member Identifiers. There is no
      // way to guarantee that with string parsing.
      if (BabelTypeModule.isMemberExpression(path.node)) {
        // console.log("Found it", path.node);
        console.log("property name", path.node.property.name);

        const generatedCode = generator(path.node);
        console.log("enter -> generatedCode", generatedCode);
        const pathArr = toPath(generatedCode.code);
        if (
          pathArr[0] === "process" &&
          pathArr[1] === "env" &&
          pathArr.length === 3
        ) {
          console.log("JJJJJode  =>", path.node.property);
          let paramName = "";

          if (pathArr[2]) {
            paramName = pathArr[2].trim();
            console.log("enter -> paramName", paramName);
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
            // path.node.property.value = `$$_INTERNAL__process.env.${path.node.property.value}$$_INTERNAL__`;
            // console.log(
            //   "enter -> path.node.property.value after",
            //   path.node.property.value
            // );
            // path.replaceWith(
            //   BabelTypeModule.stringLiteral(
            //     `$$_INTERNAL__${pathArr.join(".")}$$_INTERNAL__`
            //   )
            // );
            // target is to create confusion for babel next steps
            // `process.env["REACT_APP_PARAM_THREE"]${Math.random()}`
            // `$$_INTERNAL__PARAM_NAME_${Math.random()}$$_INTERNAL__`
            // const buildRequire = template(`
            //     $$_INTERNAL__PARAM_NAME_RANDOM_STRING$$_INTERNAL__
            // `);

            // const K = buildRequire({
            //   PARAM_NAME: BabelTypeModule.stringLiteral(pathArr.join("."))

            // });
            // console.log("enter -> K", K);

            // path.replaceWith(K);
            // `$$_INTERNAL__PARAM_NAME_${Math.random()}$$_INTERNAL__`
            // "$$_INTERNAL__START_process.env.[[REACT_APP_PARAM_THREE]]".concat(
            //   Math.random(),
            //   "$$_INTERNAL__END"
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
              console.log("enter -> MM", MM);
              path.replaceWith(MM);

              // "$$_INTERNAL__[INTERNAL==>PARAM_NAME]".concat(Math.random(), "$$_INTERNAL__")
            } catch (e) {
              console.log("error is ===>", e);
            }
            // path.replaceWith(
            //   BabelTypeModule.templateLiteral(
            //     [
            //       BabelTypeModule.templateElement({
            //         raw: "$$_INTERNAL__PARAM_NAME_",
            //         cooked: "$$_INTERNAL__PARAM_NAME_"
            //       }),
            //       BabelTypeModule.templateElement({
            //         raw: "$$_INTERNAL__",
            //         cooked: "$$_INTERNAL__"
            //       })
            //     ],
            //     [
            //       BabelTypeModule.callExpression(
            //         BabelTypeModule.memberExpression(
            //           BabelTypeModule.identifier("Math"),
            //           BabelTypeModule.identifier("random"),
            //           false
            //         )
            //       )
            //     ]
            //   )
            // );
            // path.replaceWith(
            //   BabelTypeModule.stringLiteral(
            //     `$$_INTERNAL__${pathArr.join(".")}$$_INTERNAL__`
            //   )
            // );

            // const buildRequire = template(`
            //   process.env.
            // `);
            // path.replaceWith(
            //   BabelTypeModule.memberExpression(
            //     process,
            //   )
            // );
            // const buildRequire = template(`
            //   function INTERNAL_VERIFY_NEXT_STAGE() {
            //       return MY_VALUE;
            //   }
            // `);
            // const ValueToBeinserted = pathArr.join(".");
            // // BabelTypeModule.functionExpression(Math.random(), [], ``)
            // const val = buildRequire({
            //   MY_VALUE: BabelTypeModule.stringLiteral(ValueToBeinserted)
            // });
            // console.log("enter -> val", val);
            codalo = generator(ast).code;
            console.log("enter -> codalo after transform", codalo);
          }
        }
      }
    }
  });

  return codalo;
}

module.exports = T;
