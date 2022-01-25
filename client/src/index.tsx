import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import Prefs from "./prefs/App";

const app = (
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/prefs" element={<Prefs />} />{" "}
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

if (
  window.location.hostname !== "localhost" ||
  window.location.port !== "3000"
) {
  // @ts-ignore
  const frame: Window = window.parent.frames.chatpane;
  const document = frame.document;
  const body = document.body;

  const element = document.createElement("div");
  element.setAttribute("id", "root");

  while (body.lastChild) body.removeChild(body.lastChild);
  body.appendChild(element);

  ReactDOM.render(app, element);

  window.location.href = "/main.php";
} else {
  ReactDOM.render(app, document.getElementById("root"));
}
