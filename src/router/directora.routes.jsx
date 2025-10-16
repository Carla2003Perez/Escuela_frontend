import React from "react";
import Protected from "./Protected";
import Directora from "../components/directora/directora";
import Dashboard from "../components/directora/dashboard/dashboard";
export const routesDirectora = [
  {
    path: "/directora",
    element: (
      <Protected role="directora">
        <Directora />
      </Protected>
      
    ),
    children: [
      {
        path: "dashboard", // ruta hija: /directora/dashboard
        element: <Dashboard />,
      },
      ],
  },
];
