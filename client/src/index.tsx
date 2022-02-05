import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import Prefs from "./prefs/App";

const content = <App />;

const app = (
  <React.StrictMode>
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/" element={content} />
        <Route path="index.html" element={content} />
        <Route path="prefs" element={<Prefs />} />{" "}
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

ReactDOM.render(app, document.getElementById("root"));
