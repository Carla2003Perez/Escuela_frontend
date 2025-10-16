import React from "react";
import Protected from "./Protected";
import MaestroDashboard from "../components/maestro/dashboard/dashboard";

export const routesMaestro = [
  {
    path: "/maestro",
    element: (
      <Protected role="maestro">
        <MaestroDashboard />
      </Protected>
    ),
  },
];
