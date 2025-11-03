import Protected from "./Protected";
import Dashboard from "../components/alumno/dashboard/dashboard";
import Alumno from "../components/alumno/alumno";
import { Navigate } from "react-router-dom";

export const routesAlumno = [
  {
    path: "/alumno",
    element: (
      <Protected 
      allow="alumno">
        <Alumno />
      </Protected>
    ),
    children: [
      { index: true, element: <Navigate to="dashboard" replace /> },
       // Dashboard
            { path: "dashboard", element: <Dashboard /> },
          ],

  },
];
