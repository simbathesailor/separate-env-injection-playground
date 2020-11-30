export const SOMEPARAM = process.env.REACT_APP_PARAM_TWO;

const V = SOMEPARAM;

const { REACT_APP_PARAM_TWO } = process.env;
console.log(
  "🚀 ~ file: consts.js ~ line 6 ~ REACT_APP_PARAM_TWO",
  REACT_APP_PARAM_TWO
);

export const V1 = `${SOMEPARAM}-something`;

// "I AM PARAM TWO",
