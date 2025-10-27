import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { LogOut, Home, BookOpen, CheckCircle, User } from "lucide-react";
import { useEffect, useState } from "react";

export default function Alumno() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);

  // Cargar usuario desde localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      navigate("/login", { replace: true });
      return;
    }
    setUsuario(JSON.parse(storedUser));
  }, [navigate]);

  // Escuchar logout desde otras pestañas
  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === "app:logout") {
        navigate("/login", { replace: true });
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [navigate]);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    localStorage.setItem("app:logout", String(Date.now()));
    navigate("/login", { replace: true });
  };

  return (
    <div className="flex h-screen font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-gradient-to-b from-violet-600 to-violet-500 text-white flex flex-col shadow-lg">
        <div className="p-6 text-center font-bold text-3xl border-b border-violet-700">
          Alumno
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <NavLink
            to="dashboard"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive ? "bg-violet-700" : "hover:bg-violet-600"
              }`
            }
          >
            <Home size={22} /> Dashboard
          </NavLink>

          <NavLink
            to="materias"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive ? "bg-violet-700" : "hover:bg-violet-600"
              }`
            }
          >
            <BookOpen size={22} /> Materias
          </NavLink>

          <NavLink
            to="calificaciones"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive ? "bg-violet-700" : "hover:bg-violet-600"
              }`
            }
          >
            <CheckCircle size={22} /> Calificaciones
          </NavLink>

          <NavLink
            to="perfil"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive ? "bg-violet-700" : "hover:bg-violet-600"
              }`
            }
          >
            <User size={22} /> Perfil
          </NavLink>
        </nav>

        <button
          className="m-4 p-3 flex items-center justify-center gap-2 bg-red-600 rounded-lg hover:bg-red-500 transition-colors"
          onClick={logout}
        >
          <LogOut size={20} /> Cerrar sesión
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-violet-50 overflow-auto">
        {usuario ? (
          <div>
            {/* Dashboard juvenil con tarjetas */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
              <div className="bg-violet-300 p-6 rounded-lg shadow text-white font-bold text-xl flex flex-col justify-between">
                <div>Mis Materias</div>
                <BookOpen size={40} />
              </div>

              <div className="bg-violet-400 p-6 rounded-lg shadow text-white font-bold text-xl flex flex-col justify-between">
                <div>Calificaciones</div>
                <CheckCircle size={40} />
              </div>

              <div className="bg-violet-500 p-6 rounded-lg shadow text-white font-bold text-xl flex flex-col justify-between">
                <div>Perfil</div>
                <User size={40} />
              </div>
            </div>

            {/* Aquí se cargarán las rutas anidadas */}
            <Outlet />
          </div>
        ) : (
          <p className="text-center mt-20 text-gray-500">
            Cargando información del usuario...
          </p>
        )}
      </main>
    </div>
  );
}
