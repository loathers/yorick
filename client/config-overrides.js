/* eslint-env node */

// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path");

module.exports = function override(config) {
  config.resolve.alias = {
    kolmafia$: path.resolve(__dirname, "src/kolmafia/index.ts"),
  };

  return config;
};
