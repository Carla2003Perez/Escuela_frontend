// GuestOnly.jsx
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../AuthProvider";

export default function GuestOnly({ children }) {
  const { user } = useContext(AuthContext);

  // Si el usuario ya está logueado, redirigirlo a su dashboard
  if (user) {
    const rol = user.rol?.nombre?.toLowerCase() || user.rol?.Nombre_Rol?.toLowerCase();

    if (rol === "docente") return <Navigate to="/maestro/dashboard" replace />;
    if (rol === "estudiante") return <Navigate to="/alumno/dashboard" replace />;
    if (rol === "directora") return <Navigate to="/directora/dashboard" replace />;
  }

  // Si no hay usuario logueado, mostrar el componente (login)
  return children;
}
