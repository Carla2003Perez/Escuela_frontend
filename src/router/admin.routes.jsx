import React from "react";
import Protected from "./Protected";
import Admin from "../components/Admin/admin";
import Dashboard from "../components/Admin/dashboard/dashboard";
import Crearusuario from "../components/Admin/Gestion/crearusuario";
import { Navigate } from "react-router-dom";
import Vistamaestro from  "../components/Admin/Gestion/Vistamaestro";
import VistaAlumnos from  "../components/Admin/Gestion/vistaAlumnos";

export const routesAdmin = [
  {
    path: "/administrador",
    element: (
      <Protected
       allow="administrador">
        <Admin />
      </Protected>
      
    ),
    children: [
      { index: true, element: <Navigate to="dashboard" replace /> },

      // Dashboard
      { path: "dashboard", element: <Dashboard /> },
      
      { path: "crearusuario", element: <Crearusuario /> },
      { path: "vistamaestros", element: <Vistamaestro /> },
      { path: "vistaalumnos", element: <VistaAlumnos /> },

      ],
  },
];
