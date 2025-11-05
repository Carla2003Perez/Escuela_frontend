import { NavLink, Outlet } from "react-router-dom";
import { LogOut, Home, Users } from "lucide-react";
import { useState, useContext } from "react";
import { AuthContext } from "../../AuthProvider";

export default function Maestro() {
  const { user, logout } = useContext(AuthContext); // Usa el contexto
  const [openUsuarios, setOpenUsuarios] = useState(false);


  return (
    <div className="flex h-screen font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-gradient-to-b from-blue-600 to-blue-500 text-white flex flex-col shadow-lg">
        <div className="p-6 text-center font-bold text-3xl border-b border-blue-700">
          Maestro
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <NavLink
            to="dashboard"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                isActive ? "bg-blue-700" : "hover:bg-blue-600"
              }`
            }
          >
            <Home size={22} /> Dashboard
          </NavLink>

          {/* Submenú Materias */}
          <div>
            <button
              onClick={() => setOpenUsuarios((v) => !v)}
              className="flex items-center gap-3 px-4 py-2 w-full rounded-lg hover:bg-blue-600 transition-colors font-medium"
            >
              <Users size={22} /> Materias
            </button>

            {openUsuarios && (
              <div className="flex flex-col pl-8 mt-2 space-y-1">
                <NavLink
                  to="crearmaterias"
                  className={({ isActive }) =>
                    `px-3 py-1 rounded-lg text-sm transition-colors ${
                      isActive ? "bg-blue-700" : "hover:bg-blue-600"
                    }`
                  }
                >
                  Crear Materias
                </NavLink>
                <NavLink
                  to="mismaterias"
                  className={({ isActive }) =>
                    `px-3 py-1 rounded-lg text-sm transition-colors ${
                      isActive ? "bg-blue-700" : "hover:bg-blue-600"
                    }`
                  }
                >
                  Mis Materias
                </NavLink>
              </div>
            )}
          </div>

          <NavLink
            to="tareas"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                isActive ? "bg-blue-700" : "hover:bg-blue-600"
              }`
            }
 Salomon>
            <Users size={22} /> Tareas
          </NavLink>

          <NavLink
            to="calificaciones"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                isActive ? "bg-blue-700" : "hover:bg-blue-600"
              }`
            }
          >
            <Users size={22} /> Calificaciones
          </NavLink>

          <NavLink
            to="perfil"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                isActive ? "bg-blue-700" : "hover:bg-blue-600"
              }`
            }
          >
            <Users size={22} /> Perfil
          </NavLink>
        </nav>

        {/* Botón de logout */}
        <button
          className="m-4 p-3 flex items-center justify-center gap-2 bg-red-600 rounded-lg hover:bg-red-500 transition-colors"
          onClick={logout} // Usa el logout del contexto
        >
          <LogOut size={20} /> Cerrar sesión
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-100 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}