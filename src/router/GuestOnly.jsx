import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../AuthProvider";

export default function GuestOnly({ children }) {
  const { user } = useContext(AuthContext);
  if (user) return <Navigate to="/" />; // redirige a dashboard según rol
  return children;
}
