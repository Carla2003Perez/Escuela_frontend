import React from "react";
import Protected from "./Protected";
import Directora from "../components/directora/directora";
import Dashboard from "../components/directora/dashboard/dashboard";
import Crearusuario from "../components/directora/Gestion/crearusuario";
import { Navigate } from "react-router-dom";
import Eventos from "../components/directora/Eventos/eventos";
import CrearGrados from "../components/directora/grados/grados";
import Vistamaestro from  "../components/directora/Gestion/Vistamaestro";
import VistaAlumnos from  "../components/directora/Gestion/vistaAlumnos";
import Perfil from "../components/directora/Perfil/perfil";
export const routesDirectora = [
  {
    path: "/directora",
    element: (
      <Protected
       allow="directora">
        <Directora />
      </Protected>
      
    ),
    children: [
      { index: true, element: <Navigate to="dashboard" replace /> },

      // Dashboard
      { path: "dashboard", element: <Dashboard /> },
      
      { path: "crearusuario", element: <Crearusuario /> },
      { path: "vistamaestros", element: <Vistamaestro /> },
      { path: "vistaalumnos", element: <VistaAlumnos /> },
      { path: "creargrados", element: <CrearGrados /> },

      { path: "eventos", element: <Eventos /> },
      { path: "perfil", element: <Perfil /> },

      ],
  },
];
