import React from "react";
import Protected from "./Protected";
import AlumnoDashboard from "../components/alumno/dashboard/dashboard";

export const routesAlumno = [
  {
    path: "/alumno",
    element: (
      <Protected role="alumno">
        <AlumnoDashboard />
      </Protected>
    ),
  },
];
