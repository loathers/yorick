const { write } = require("kolmafia");

function main() {
  write(
    [
      "<html><body>",
      "<script>",
      'window.parent.frames.chatpane.location.href = "http://localhost:3000/";',
      'window.parent.frames.mainpane.location.href = "/main.php";',
      "</script>",
      "</body></html>",
      "",
    ].join("\n")
  );
}

module.exports.main = main;
