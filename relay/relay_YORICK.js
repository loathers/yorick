/* eslint-env commonjs */

const { getRevision, write } = require("kolmafia");

function main() {
  if (0 < getRevision() && getRevision() < 28088) {
    write(
      "<html><body><h1>Need KoLmafia revision at least 28088 to run YORICK.</h1></body></html>",
    );
  } else {
    write(
      '<html><body><script>window.parent.frames.mainpane.location.href = "/yorick/load.html";</script></body></html>',
    );
  }
}

module.exports.main = main;
