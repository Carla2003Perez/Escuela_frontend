import { NavLink } from "react-router-dom";
import { LogOut, Home, Users } from "lucide-react";

export default function directoraSidebar() {
  return (
    <aside className="w-64 h-screen bg-blue-900 text-white flex flex-col">
      <div className="p-6 text-center font-bold text-2xl border-b border-blue-700">
        Directora
      </div>

      <nav className="flex-1 p-4 space-y-3">
        <NavLink
          to="dashboard"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 rounded-lg ${
              isActive ? "bg-blue-700" : "hover:bg-blue-800"
            }`
          }
        >
          <Home size={20} /> Panel Principal
        </NavLink>

        <NavLink
          to="usuarios"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 rounded-lg ${
              isActive ? "bg-blue-700" : "hover:bg-blue-800"
            }`
          }
        >
          <Users size={20} /> Gestión de Usuarios
        </NavLink>
      </nav>

      <button className="p-4 flex items-center justify-center gap-2 bg-blue-800 hover:bg-blue-700">
        <LogOut size={18} /> Cerrar sesión
      </button>
    </aside>
  );
}
