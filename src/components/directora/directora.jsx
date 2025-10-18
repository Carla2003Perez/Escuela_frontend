import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { LogOut, Home, Users } from "lucide-react";
import { useEffect, useState } from "react";

export default function Directora() {
  const navigate = useNavigate();

  // Estados locales para UI
  const [openUsuarios, setOpenUsuarios] = useState(false);
  const [openGrados, setOpenGrados] = useState(false);
  
  // Leer usuario desde localStorage
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      navigate("/login", { replace: true });
      return;
    }
    setUsuario(JSON.parse(storedUser));
  }, [navigate]);

  // Sincronizar logout entre pestañas
  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === "app:logout") {
        setOpenUsuarios(false);
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
    setOpenUsuarios(false);
    navigate("/login", { replace: true });
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-blue-900 text-white flex flex-col">
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
            <Home size={20} /> Dashboard
          </NavLink>

          {/* Gestión de  grados */}
          <div>
            <button
              onClick={() => setOpenGrados((v) => !v)}
              className="flex items-center gap-3 px-3 py-2 w-full rounded-lg hover:bg-blue-800"
            >
              <Users size={20} /> Gestión grados
              <span className="ml-auto">{openGrados ? "▲" : "▼"}</span>
            </button>

            {openGrados && (
              <div className="flex flex-col pl-8 mt-2 space-y-2">
                <NavLink
                  to="creargrados"
                  className={({ isActive }) =>
                    `px-3 py-1 rounded-lg ${
                      isActive ? "bg-blue-700" : "hover:bg-blue-800"
                    }`
                  }
                >
                  Crear Grados
                </NavLink>
                
              </div>
            )}
          </div>

          {/* Gestión de Usuarios con submenú */}
          <div>
            <button
              onClick={() => setOpenUsuarios((v) => !v)}
              className="flex items-center gap-3 px-3 py-2 w-full rounded-lg hover:bg-blue-800"
            >
              <Users size={20} /> Gestión de Usuarios
              <span className="ml-auto">{openUsuarios ? "▲" : "▼"}</span>
            </button>

            {openUsuarios && (
              <div className="flex flex-col pl-8 mt-2 space-y-2">
                <NavLink
                  to="crearusuario"
                  className={({ isActive }) =>
                    `px-3 py-1 rounded-lg ${
                      isActive ? "bg-blue-700" : "hover:bg-blue-800"
                    }`
                  }
                >
                  Crear usuarios
                </NavLink>
                <NavLink
                  to="vistamaestros"
                  className={({ isActive }) =>
                    `px-3 py-1 rounded-lg ${
                      isActive ? "bg-blue-700" : "hover:bg-blue-800"
                    }`
                  }
                >
                  Maestros
                </NavLink>
                <NavLink
                  to="vistaalumnos"
                  className={({ isActive }) =>
                    `px-3 py-1 rounded-lg ${
                      isActive ? "bg-blue-700" : "hover:bg-blue-800"
                    }`
                  }
                >
                  Alumnos
                </NavLink>
              </div>
            )}
          </div>

           

          <NavLink
            to="eventos"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-lg ${
                isActive ? "bg-blue-700" : "hover:bg-blue-800"
              }`
            }
          >
            <Users size={20} /> Eventos
          </NavLink>

          <NavLink
            to="perfil"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-lg ${
                isActive ? "bg-blue-700" : "hover:bg-blue-800"
              }`
            }
          >
            <Users size={20} /> Perfil
          </NavLink>
        </nav>

        <button
          className="p-4 flex items-center justify-center gap-2 bg-blue-800 hover:bg-blue-700"
          onClick={logout}
        >
          <LogOut size={18} /> Cerrar sesión
        </button>
      </div>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-100 overflow-auto">
        {usuario ? (
          <Outlet />
        ) : (
          <p className="text-center mt-20 text-gray-500">
            Cargando información del usuario...
          </p>
        )}
      </main>
    </div>
  );
}
