import { NavLink } from "react-router-dom";
import { LogOut, Home, BookOpen } from "lucide-react";

export default function maestroSidebar() {
  return (
    <aside className="w-64 h-screen bg-green-900 text-white flex flex-col">
      <div className="p-6 text-center font-bold text-2xl border-b border-green-700">
        Maestro
      </div>

      <nav className="flex-1 p-4 space-y-3">
        <NavLink
          to="dashboard"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 rounded-lg ${
              isActive ? "bg-green-700" : "hover:bg-green-800"
            }`
          }
        >
          <Home size={20} /> Inicio
        </NavLink>

        <NavLink
          to="notas"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 rounded-lg ${
              isActive ? "bg-green-700" : "hover:bg-green-800"
            }`
          }
        >
          <BookOpen size={20} /> Calificaciones
        </NavLink>
      </nav>

      <button className="p-4 flex items-center justify-center gap-2 bg-green-800 hover:bg-green-700">
        <LogOut size={18} /> Cerrar sesión
      </button>
    </aside>
  );
}
