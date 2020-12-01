This project is the playground for 

[https://github.com/simbathesailor/envvarprep-loader](https://github.com/simbathesailor/envvarprep-loader)


This project uses envvarprep-loader (webnpack loader to replace process.env strings)

Run 
```
yarn run build
```

Run 

```
node replaceStringInBundle.js

```



This kind of code also fail even without this laoder:


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

const { env } = process;

const { REACT_APP_PARAM_THREE: threeVar } = env;
console.log("🚀 ~ file: App.js ~ line 18 ~ threeVar", threeVar);

so yes writing const { env } =process is inherentluy not supported
as it is available only on node. So putting an effort to support following syntax  is  not worth it.

```
const { env } = process
const { variable } = env
```


I think there is one more way which also support this additional syntax
which is used sometimes

```
const { PARAM } = process.env

```

To support that i can make use of define plugin and envvar preploader. Just have this define plugin defined like this in webpack:


```
 new webpack.DefinePlugin({
        ...env.stringified,
        MY_SECRET_VALUE: JSON.stringify("HOLA My SECRET VALUE"),
        "process.env": (() => {
          return Object.keys(env.raw).reduce((acc, key) => {
            if (
              ["NODE_ENV", "PUBLIC_URL"].includes(key) &&
              ![
                "WDS_SOCKET_HOST",
                "WDS_SOCKET_PATH",
                "WDS_SOCKET_PORT",
              ].includes(key)
            ) {
              acc[key] = JSON.stringify(env.raw[key]);
            } else if (
              ![
                "WDS_SOCKET_HOST",
                "WDS_SOCKET_PATH",
                "WDS_SOCKET_PORT",
              ].includes(key)
            ) {
              console.log(
                "🚀 ~ file: webpack.config.js ~ line 625 ~ returnObject.keys ~ key",
                key
              );

              // "$$_INTERNAL__process.env.REACT_APP_PARAM_TWOMATH_RANDOM_START".concat(
              //   Math.random(),
              //   "MATH_RANDOM_END$$_INTERNAL__"

              // "$$_INTERNAL__process.env.REACT_APP_PARAM_TWOMATH_RANDOM_START".concat(Math.random(),"MATH_RANDOM_END$$_INTERNAL__"
              // '$$_INTERNAL__process.env.REACT_APP_PARAM_ONEMATH_RANDOM_START".concat(Math.random(),"MATH_RANDOM_END$$_INTERNAL__'
              acc[
                key
              ] = `"$$_INTERNAL__process.env.${key}MATH_RANDOM_START".concat(Math.random(),"MATH_RANDOM_END$$_INTERNAL__")`;
            }
            return acc;
          }, {});
        })(),
      }),
```

And then once this is done just run node replaceStringInBundle.js

and then starts the server exactly same.

But this may requuire changes in the way you will plan the docker.

Now you need to know atleast the keys , before hand at the compile time and then you can  build the bundle .

and at the run time , you can  inject the right values.

For now, i can set a disclaimer that only use procee.env values as
process.env.PARAMNAME.



So will change that if needed.


Note:I am making use of npm link for the development and testing of envvar-prep loader . So if cloning in a new machine make sure that 
you do npm link. If you want to make use of one from the npm, just npm unlink envvarprep-loader.


In the best case i will be needing define plugin and envvarprep-loader injectEnv script.


Define plugin does the inplace code replacement , before processing the code. It is as simple as string replacement.












