const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/",
    createProxyMiddleware(
      [
        "**",
        "!/",
        "!/prefs",
        "!/static/js/bundle.js",
        "!/favicon.ico",
        "!/manifest.json",
        "!/logo*.png",
        "!**/*.hot-update.json",
        "!**/*.hot-update.js",
        "!**/*.js.map",
      ],
      {
        target: "http://127.0.0.1:60080",
        changeOrigin: true,
        secure: false,
      }
    )
  );
};
