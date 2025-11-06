// GuestOnly.jsx → CORREGIDO
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../AuthProvider";

export default function GuestOnly({ children }) {
  const { user } = useContext(AuthContext);

  // Verifica contexto O localStorage
  const currentUser = user || JSON.parse(localStorage.getItem("user") || "null");

  if (currentUser) {
    const rol = (
      currentUser.rol?.nombre ||
      currentUser.rol?.Nombre_Rol ||
      ""
    ).toLowerCase();

    const redirectMap = {
      docente: "/maestro/dashboard",
      estudiante: "/alumno/dashboard",
      directora: "/directora/dashboard",
    };

    return <Navigate to={redirectMap[rol] || "/"} replace />;
  }

  return children;
}