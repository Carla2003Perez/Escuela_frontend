import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../AuthProvider";

export default function Protected({ role, children }) {
  const { user } = useContext(AuthContext);

  if (!user) return <Navigate to="/login" replace />;
  if (role && user.rol?.Nombre_Rol !== role)
    return <Navigate to="/login" replace />;

  return children;
}
