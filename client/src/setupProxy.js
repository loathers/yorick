const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/",
    createProxyMiddleware(
      [
        "**",
        "!/",
        "!/static/js/bundle.js",
        "!/favicon.ico",
        "!/manifest.json",
        "!**/*.hot-update.json",
        "!**/*.hot-update.js",
      ],
      {
        target: "http://127.0.0.1:60080",
        changeOrigin: true,
        secure: false,
      }
    )
  );
};
