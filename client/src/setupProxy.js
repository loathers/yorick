const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/",
    createProxyMiddleware(
      [
        "**",
        "!/yorick",
        "!/yorick/index.html",
        "!/yorick/prefs",
        "!/yorick/static/js/bundle.js",
        "!/yorick/favicon.ico",
        "!/yorick/manifest.json",
        "!/yorick/logo*.png",
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
