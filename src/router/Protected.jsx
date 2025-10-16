import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../AuthProvider";

export default function ProtectedRoute({ children, roles }) {
  const { user } = useContext(AuthContext);

  if (user === null) {
    // Esperar a que AuthProvider cargue el usuario de localStorage
    return null; 
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (roles && !roles.includes(user.rol?.nombre || user.rol?.Nombre_Rol)) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
