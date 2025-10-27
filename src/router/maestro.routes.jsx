import React from "react";
import Protected from "./Protected";
import Dashboard from "../components/maestro/dashboard/dashboard";
import Maestro from "../components/maestro/maestro";
import Crearmaterias from "../components/maestro/Materias/crearmaterias";
import Mismaterias from "../components/maestro/Materias/mismaterias";
import Calificaciones from "../components/maestro/calificaciones/calificaciones";
import Tareas from "../components/maestro/Tareas/tareas";
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
      { path: "dashboard", element: <Dashboard /> },
      { path: "crearmaterias", element: <Crearmaterias /> },
      { path: "mismaterias", element: <Mismaterias /> },
      { path: "tareas", element: <Tareas /> },
      { path: "calificaciones", element: <Calificaciones /> },
      { path: "perfil", element: <Perfil /> },
      
     
      ],
  },
];
