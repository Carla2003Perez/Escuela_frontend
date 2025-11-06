import { NavLink, Outlet } from "react-router-dom";
import {
  LogOut,
  Home,
  BookOpen,
  Layers,
  FileText,
  User,
  ClipboardList,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../AuthProvider";
import { obtenerGradoPorDocente } from "../Services/gradoService";

export default function Maestro() {
  const { user, logout } = useContext(AuthContext);
  const [openGrados, setOpenGrados] = useState(false);
  const [grados, setGrados] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.id_docente) {
      setLoading(false);
      return;
    }

    obtenerGradoPorDocente(user.id_docente)
      .then((data) => {
        const gradosArray = Array.isArray(data) ? data : [];
        setGrados(gradosArray);
        setError("");
      })
      .catch((err) => {
        console.error("Error cargando grados:", err);
        setError(err.message || "Error al cargar los grados");
        setGrados([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [user]);

  return (
    <div className="flex h-screen font-sans bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-gradient-to-b from-teal-700 to-teal-600 text-white flex flex-col shadow-xl">
        <div className="p-6 text-center border-b border-teal-800">
          <h1 className="text-2xl font-bold tracking-wide">INEB</h1>
          <p className="text-teal-200 text-sm mt-1">
            Bienvenido, {user?.nombre || "Docente"}
          </p>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {/* Inicio */}
          <NavLink
            to="dashboard"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg transition-all ${
                isActive ? "bg-teal-800 shadow-md" : "hover:bg-teal-700 hover:shadow"
              }`
            }
          >
            <Home size={20} /> Inicio
          </NavLink>

          {/* Grados - Desplegable */}
          <div>
            <button
              onClick={() => setOpenGrados(!openGrados)}
              className="flex items-center justify-between gap-3 px-4 py-2 w-full rounded-lg hover:bg-teal-700 transition-all font-medium"
            >
              <div className="flex items-center gap-3">
                <Layers size={20} />
                Mis Grados
              </div>
              {openGrados ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>

            {openGrados && (
              <div className="flex flex-col pl-10 mt-2 space-y-1 text-sm">
                {loading ? (
                  <p className="text-gray-300 text-sm pl-3 animate-pulse">
                    Cargando grados...
                  </p>
                ) : grados.length > 0 ? (
                  grados.map((grado) => (
                    <NavLink
                      key={grado.id_grado}
                      to={`grado/${grado.id_grado}`}
                      className={({ isActive }) =>
                        `px-3 py-1.5 rounded-md transition-colors block text-left ${
                          isActive
                            ? "bg-teal-800 font-semibold shadow-sm"
                            : "hover:bg-teal-700"
                        }`
                      }
                      end
                    >
                      {grado.nombre_grado}
                    </NavLink>
                  ))
                ) : (
                  <p className="text-gray-300 text-sm pl-3 italic">
                    {error || "Sin grados asignados"}
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Tareas */}
          <NavLink
            to="tareas"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg transition-all ${
                isActive ? "bg-teal-800 shadow-md" : "hover:bg-teal-700 hover:shadow"
              }`
            }
          >
            <ClipboardList size={20} /> Tareas
          </NavLink>

          {/* Calificaciones */}
          <NavLink
            to="calificaciones"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg transition-all ${
                isActive ? "bg-teal-800 shadow-md" : "hover:bg-teal-700 hover:shadow"
              }`
            }
          >
            <FileText size={20} /> Calificaciones
          </NavLink>

          {/* Perfil */}
          <NavLink
            to="perfil"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg transition-all ${
                isActive ? "bg-teal-800 shadow-md" : "hover:bg-teal-700 hover:shadow"
              }`
            }
          >
            <User size={20} /> Perfil
          </NavLink>
        </nav>

        {/* Logout */}
        <div className="border-t border-teal-800 p-4">
          <button
            onClick={logout}
            className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-500 active:bg-red-700 transition-colors py-2.5 rounded-lg font-medium shadow-md"
          >
            <LogOut size={18} /> Cerrar sesión
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-auto bg-white">
        <Outlet />
      </main>
    </div>
  );
}