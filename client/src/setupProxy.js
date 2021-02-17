const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    ["/api/**", "/auth/google", "/api/surveys/thanks"],
    createProxyMiddleware({
      target: "http://localhost:5000",
    })
  );
};
