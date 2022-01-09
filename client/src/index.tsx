import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

if (window.location.hostname !== "localhost") {
  console.log("frames - will refresh");
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

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
