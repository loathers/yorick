/* eslint-env commonjs */

const { write } = require("kolmafia");

function main() {
  write(
    '<html><body><script>window.parent.frames.mainpane.location.href = "/yorick/load.html";</script></body></html>',
  );
}

module.exports.main = main;
