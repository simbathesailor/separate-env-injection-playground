(this["webpackJsonppoc-separate-env-injection"] =
  this["webpackJsonppoc-separate-env-injection"] || []).push([
  [0],
  [
    ,
    ,
    ,
    function(e, n, t) {
      e.exports = t.p + "static/media/logo.5d5d9eef.svg";
    },
    function(e, n, t) {
      e.exports = t(11);
    },
    ,
    ,
    ,
    ,
    function(e, n, t) {},
    function(e, n, t) {},
    function(e, n, t) {
      "use strict";
      t.r(n);
      var a = t(0),
        o = t.n(a),
        c = t(2),
        s = t.n(c),
        r = (t(9), t(3)),
        i = t.n(r),
        l =
          (t(10),
          "$$_INTERNAL__process.env.REACT_APP_HRX_API_SERVER_URL$$_INTERNAL__".concat(
            "/idm"
          )),
        p = "$$_INTERNAL__process.env.REACT_APP_HRX_API_SERVER_URL$$_INTERNAL__".concat(
          "/uam"
        ),
        _ = "$$_INTERNAL__process.env.REACT_APP_HRX_API_SERVER_URL$$_INTERNAL__".concat(
          "/admin-core"
        );
      "".concat(l, "/users/logout"),
        "".concat(p, "/users/:companyId/login-as-client-admin"),
        "".concat(p, "/users/assigned-companies"),
        "".concat(p, "/users/:companyId/client-admin/list"),
        "".concat(_, "/us-benefits/guidance/details"),
        "".concat(_, "/us-benefits/programs/details"),
        "".concat(_, "/us-benefits/plans/:planId/details?type=:planType"),
        "".concat(_, "/us-benefits"),
        "".concat(_, "/docs-resources/:module");
      var d = function() {
        return (
          console.log("production"),
          a.createElement(
            "div",
            { className: "App" },
            a.createElement(
              "header",
              { className: "App-header" },
              a.createElement("img", {
                src: i.a,
                className: "App-logo",
                alt: "logo"
              }),
              a.createElement(
                "p",
                null,
                "Edit ",
                a.createElement("code", null, "src/App.js"),
                " and save to reload."
              ),
              a.createElement(
                "a",
                {
                  className: "App-link",
                  href: "https://reactjs.org",
                  target: "_blank",
                  rel: "noopener noreferrer"
                },
                "Learn React"
              )
            )
          )
        );
      };
      Boolean(
        "localhost" === window.location.hostname ||
          "[::1]" === window.location.hostname ||
          window.location.hostname.match(
            /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
          )
      );
      s.a.render(
        o.a.createElement(o.a.StrictMode, null, o.a.createElement(d, null)),
        document.getElementById("root")
      ),
        "serviceWorker" in navigator &&
          navigator.serviceWorker.ready
            .then(function(e) {
              e.unregister();
            })
            .catch(function(e) {
              console.error(e.message);
            });
    }
  ],
  [[4, 1, 2]]
]);
//# sourceMappingURL=main.ba857af1.chunk.js.map
