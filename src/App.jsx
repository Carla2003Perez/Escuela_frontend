import React from "react";
import { Routes, Route } from "react-router-dom";
import routes from "./router/routes";

const renderRoutes = (routes) =>
  routes.map((r, i) => (
    <Route key={i} path={r.path} element={r.element}>
      {r.children && renderRoutes(r.children)}
    </Route>
  ));

export default function App() {
  return <Routes>{renderRoutes(routes)}</Routes>;
}
