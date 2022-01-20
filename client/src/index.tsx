import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

if (window.location.hostname !== "localhost") {
  // @ts-ignore
  const frame: Window = window.parent.frames.chatpane;
  const document = frame.document;
  const body = document.body;

  const element = document.createElement("div");
  element.setAttribute("id", "root");

  while (body.lastChild) body.removeChild(body.lastChild);
  body.appendChild(element);

  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    element
  );

  window.location.href = "/main.php";
} else {
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById("root")
  );
}
