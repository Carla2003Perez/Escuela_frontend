// src/components/maestro/maestro.jsx
import { NavLink, Outlet } from "react-router-dom";
import {
  LogOut,
  Home,
  Layers,
  FileText,
  User,
  ClipboardList,
  ChevronDown,
  ChevronUp,
  Users,
} from "lucide-react";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../AuthProvider";
import { obtenerGradosAsignados } from "../Services/gradoService";

export default function Maestro() {
  const { user, logout } = useContext(AuthContext);
  const [openGrados, setOpenGrados] = useState(false);
  const [grados, setGrados] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

useEffect(() => {
    const fetchGrados = async () => {
      setLoading(true);
      setError("");
      try {
        const docenteId =
          user?.id_docente || JSON.parse(localStorage.getItem("user"))?.id_docente;

        if (!docenteId) {
          setError("No se encontró el ID del docente");
          return;
        }

        const data = await obtenerGradosAsignados(docenteId);
        setGrados(data);
      } catch (err) {
        console.error("Error al cargar grados:", err);
        setError("Error al cargar grados");
      } finally {
        setLoading(false);
      }
    };

    if (openGrados) {
      fetchGrados();
    }
  }, [openGrados, user]);

  return (
    <div className="flex h-screen font-sans bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-gradient-to-b from-teal-700 to-teal-600 text-white flex flex-col shadow-xl">
        <div className="p-6 text-center border-b border-teal-800">
          <h1 className="text-2xl font-bold">INEB</h1>
          <p className="text-teal-200 text-sm mt-1">
            {user?.nombre_docente || user?.nombre || "Docente"}
          </p>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          <NavLink
            to="dashboard"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg transition-all ${
                isActive ? "bg-teal-800" : "hover:bg-teal-700"
              }`
            }
          >
            <Home size={20} /> Inicio
          </NavLink>

          {/* Mis grados */}
          <div>
      <button
        onClick={() => setOpenGrados(!openGrados)}
        className="flex items-center justify-between gap-3 px-4 py-2 w-full rounded-lg hover:bg-teal-700 transition-all font-medium"
      >
        <div className="flex items-center gap-3">
          <Layers size={20} />
          Mis Grados ({grados.length})
        </div>
        {openGrados ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>

      {openGrados && (
        <div className="flex flex-col pl-10 mt-2 space-y-1 text-sm">
          {loading ? (
            <p className="text-gray-300 text-xs pl-3 animate-pulse">
              Cargando...
            </p>
          ) : grados.length > 0 ? (
            grados.map((grado) => (
              <NavLink
                key={grado.id_grado}
                to={`grado/${grado.id_grado}`}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md flex items-center justify-between ${
                    isActive ? "bg-teal-800 font-semibold" : "hover:bg-teal-700"
                  }`
                }
                end
              >
                <span className="truncate">{grado.nombre_grado}</span>
                <div className="flex items-center gap-1 text-xs opacity-70">
                  <Users size={14} />
                  {grado.estudiantes?.length || 0}
                </div>
              </NavLink>
            ))
          ) : (
            <p className="text-gray-300 text-xs pl-3 italic">
              {error || "Sin grados asignados"}
            </p>
          )}
        </div>
      )}
      </div>

          <NavLink
            to="tareas"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg transition-all ${
                isActive ? "bg-teal-800" : "hover:bg-teal-700"
              }`
            }
          >
            <ClipboardList size={20} /> Tareas
          </NavLink>

          <NavLink
            to="calificaciones"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg transition-all ${
                isActive ? "bg-teal-800" : "hover:bg-teal-700"
              }`
            }
          >
            <FileText size={20} /> Calificaciones
          </NavLink>

          <NavLink
            to="perfil"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg transition-all ${
                isActive ? "bg-teal-800" : "hover:bg-teal-700"
              }`
            }
          >
            <User size={20} /> Perfil
          </NavLink>
        </nav>

        <div className="border-t border-teal-800 p-4">
          <button
            onClick={logout}
            className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-500 py-2.5 rounded-lg font-medium"
          >
            <LogOut size={18} /> Cerrar sesión
          </button>
        </div>
      </aside>

      <main className="flex-1 p-6 overflow-auto bg-white">
        <Outlet />
      </main>
    </div>
  );
}
