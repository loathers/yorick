import "./index.css";

import React from "react";
import { createRoot } from "react-dom/client";
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

const root = document.getElementById("root");
if (root) {
  createRoot(root).render(app);
}
