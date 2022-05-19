/* eslint-env node */

const path = require("path");

module.exports = function override(config) {
  config.resolve.alias = {
    kolmafia$: path.resolve(__dirname, "src/kolmafia/index.ts"),
  };

  return config;
};
