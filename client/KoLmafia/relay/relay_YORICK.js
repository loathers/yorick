const { write } = require("kolmafia");

function main() {
  write(
    [
      "<html><body>",
      "<script>",
      'window.parent.frames.chatpane.location.href = "/yorick/index.html";',
      'window.parent.frames.mainpane.location.href = "/main.php";',
      "</script>",
      "</body></html>",
      "",
    ].join("\n")
  );
}

module.exports.main = main;
