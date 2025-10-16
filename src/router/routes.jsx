import Login from "../Login/login";
import NotFound from "./NotFound";
import { Navigate } from "react-router-dom";
import { routesAlumno } from "./alumno.routes";
import { routesDirectora } from "./directora.routes";
import { routesMaestro } from "./maestro.routes";

const routes = [
  { path: "/", element: <Navigate to="/login" replace /> },
  
   // Ruta pública para login
  { path: "/login", element: <Login /> },
  ...routesAlumno,
  ...routesDirectora,
  ...routesMaestro,
  { path: "*", element: <NotFound /> },
];

export default routes;
