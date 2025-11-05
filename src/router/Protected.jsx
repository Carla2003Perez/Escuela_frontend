// Protected.jsx (CORREGIDO - SIN BUCLE)
import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../AuthProvider";

const Protected = ({ allow, children }) => {
  const { user } = useContext(AuthContext);
  const location = useLocation();

  // NO useEffect
  // NO setUser
  // NO localStorage aquí

  // Verifica usuario en contexto O localStorage
  const currentUser = user || JSON.parse(localStorage.getItem("user") || "null");

  if (!currentUser) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  const rol = (
    currentUser.rol?.nombre ||
    currentUser.rol?.Nombre_Rol ||
    ""
  ).toLowerCase();

  if (rol !== allow.toLowerCase()) {
   <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default Protected;