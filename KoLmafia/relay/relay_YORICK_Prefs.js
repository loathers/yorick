/* eslint-env commonjs */

const { write } = require("kolmafia");

function main() {
  write(
    [
      "<html><body>",
      "<script>",
      'if (!window.location.href.includes("localhost:3000")) window.parent.location.href = "http://localhost:3000/game.php"',
      'else window.parent.frames.mainpane.location.href = "http://localhost:3000/yorick/prefs";',
      "</script>",
      "</body></html>",
      "",
    ].join("\n"),
  );
}

module.exports.main = main;
