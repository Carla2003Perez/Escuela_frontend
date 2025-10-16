import React from "react";
import { Routes, Route } from "react-router-dom";
import routes from "./router/routes";

export default function App() {
  return (
    <Routes>
      {routes.map((r, i) => (
        <Route key={i} path={r.path} element={r.element} />
      ))}
    </Routes>
  );
}
