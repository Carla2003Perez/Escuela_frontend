import React from "react";
import Protected from "./Protected";
import MaestroDashboard from "../components/maestro/dashboard/dashboard";
import Maestro from "../components/maestro/maestro";
import Crearmaterias from "../components/maestro/Materias/crearmaterias";
import Mismaterias from "../components/maestro/Materias/mismaterias";
import Calificaciones from "../components/maestro/calificaciones/calificaciones";
import Perfil from "../components/maestro/Perfil/Perfil";
import { Navigate } from "react-router-dom";

export const routesMaestro = [
  {
    path: "/maestro",
    element: (
      <Protected allow="maestro">
        <Maestro />
      </Protected>
    ),
    children: [
      { index: true, element: <Navigate to="dashboard" replace /> },

      // Dashboard
      { path: "dashboard", element: <MaestroDashboard /> },
      { path: "crearmaterias", element: <Crearmaterias /> },
      { path: "mismaterias", element: <Mismaterias /> },
      { path: "calificaciones", element: <Calificaciones /> },
      { path: "perfil", element: <Perfil /> },
      
     
      ],
  },
];
