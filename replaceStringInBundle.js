const { injectEnv } = require("envvarprep-loader");

const payload = {
  globOptions: {
    cwd: `./build/static/js`
  },
  pattern: "*.js?(.map)",
  envVar: {
    REACT_APP_PARAM_ONE: "I AM PARAM ONE",

    REACT_APP_PARAM_TWO: "I AM PARAM TWO",

    REACT_APP_PARAM_THREE: "I AM PARAM THREE"
  },
  debug: true
};

injectEnv(payload);
