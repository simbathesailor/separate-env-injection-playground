const path = require("path");
const glob = require("glob");

const fs = require("fs");

const envFromParamStore = {
  REACT_APP_ADMIN_CORE_API_URL:
    "https://hrx-backend-dev.sequoia-development.com/admin-core/",
  REACT_APP_ENABLE_BROADCASTS: "false",
  REACT_APP_GA_TRACKINGID: "UA-145084720-2",
  REACT_APP_HRX_API_SERVER_URL:
    "https://hrx-backend-dev.sequoia-development.com",
  REACT_APP_IDM_BASE_URL: "https://hrx-backend-dev.sequoia-development.com/idm",
  REACT_APP_ROOT_DOMAIN: "sequoia-development.com",
  REACT_APP_UAM_BASE_URL: "https://hrx-backend-dev.sequoia-development.com/uam",
  REACT_APP_UAM_FRONTEND_URL:
    "https://uam-web-dev.sequoia-development.com/users",
  REACT_APP_URL: "https://admin-core-web-staging.sequoia-development.com/",
  REACT_APP_USER_PROFILE_DETAILS:
    "https://hrx-backend-dev.sequoia-development.com/uam/users/profile",
  REACT_APP_COMPLIANCE_RES_BASE_PATH: "/TestComp",
  REACT_APP_COMPLIANCE_RES_ROOT_SITE_NAME: "Compliance",
  REACT_APP_COMPLIANCE_RES_ROOT_TITLE: "Compliance",
  REACT_APP_INSIGHTS_SISENSE_DASHBOARD_DATA_API:
    "https://hrx-backend-dev.sequoia-development.com/sisense/peopleinsight/dashboards",
  REACT_APP_INSIGHTS_SISENSE_HOST: "https://stgreports.sequoia-development.com",
  REACT_APP_INSIGHTS_SISENSE_JWT_ACCESS_TOKEN_API:
    "https://hrx-backend-dev.sequoia-development.com/sisense/jwt",
  REACT_APP_LOGIN_APP_URL: "https://login-web-dev.sequoia-development.com/",
  REACT_APP_SESSION_TIMEOUT_MS: "1800000"
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
