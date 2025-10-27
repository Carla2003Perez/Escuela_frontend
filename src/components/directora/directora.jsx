import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { LogOut, Home, Users, BookOpen, Calendar, ChevronDown, ChevronUp } from "lucide-react";
import { useEffect, useState } from "react";

export default function Directora() {
  const navigate = useNavigate();
  const [openUsuarios, setOpenUsuarios] = useState(false);
  const [openGrados, setOpenGrados] = useState(false);
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      navigate("/login", { replace: true });
      return;
    }
    setUsuario(JSON.parse(storedUser));
  }, [navigate]);

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
    localStorage.clear();
    localStorage.setItem("app:logout", String(Date.now()));
    navigate("/login", { replace: true });
  };

  return (
    <div className="flex h-screen bg-orange-200">
      {/* Sidebar */}
      <aside className="w-64 bg-gradient-to-b from-orange-400 to-orange-300 text-white shadow-lg flex flex-col">
        <div className="p-6 text-center border-b border-orange-200">
          <h1 className="text-2xl font-bold">Directora</h1>
          
        </div>

        <nav className="flex-1 p-4 space-y-3 overflow-y-auto">
          <NavLink
            to="dashboard"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${
                isActive
                  ? "bg-orange-600 text-white font-semibold"
                  : "hover:bg-orange-700 text-blue-100"
              }`
            }
          >
            <Home size={20} /> Inicio
          </NavLink>


          {/* Gestión de usuarios */}
          <div>
            <button
              onClick={() => setOpenUsuarios((v) => !v)}
              className="flex items-center gap-3 px-3 py-2 w-full rounded-lg hover:bg-orange-600 transition-all text-blue-100"
            >
              <Users size={20} /> Gestión de Usuarios
              <span className="ml-auto">
                {openUsuarios ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </span>
            </button>

            <div
              className={`overflow-hidden transition-all duration-300 ${
                openUsuarios ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <div className="flex flex-col pl-8 mt-2 space-y-2">
                <NavLink
                  to="crearusuario"
                  className={({ isActive }) =>
                    `px-3 py-1 rounded-lg transition-all ${
                      isActive
                        ? "bg-orange-600 text-white"
                        : "hover:bg-orange-700 text-blue-100"
                    }`
                  }
                >
                  Crear Usuarios
                </NavLink>
                <NavLink
                  to="vistamaestros"
                  className={({ isActive }) =>
                    `px-3 py-1 rounded-lg ${
                      isActive
                         ? "bg-orange-500 text-white font-semibold"
                  : "hover:bg-orange-600 text-blue-100"
                    }`
                  }
                >
                  Maestros
                </NavLink>
                <NavLink
                  to="vistaalumnos"
                  className={({ isActive }) =>
                    `px-3 py-1 rounded-lg ${
                      isActive
                         ? "bg-orange-500 text-white font-semibold"
                  : "hover:bg-orange-600 text-blue-100"
                    }`
                  }
                >
                  Alumnos
                </NavLink>
              </div>
            </div>
          </div>

          {/* Gestión de grados */}
          <div>
            <button
              onClick={() => setOpenGrados((v) => !v)}
              className="flex items-center gap-3 px-3 py-2 w-full rounded-lg hover:bg-orange-600 transition-all text-blue-100"
            >
              <BookOpen size={20} /> Gestión de Grados
              <span className="ml-auto">
                {openGrados ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </span>
            </button>

            <div
              className={`overflow-hidden transition-all duration-300 ${
                openGrados ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <div className="flex flex-col pl-8 mt-2 space-y-2">
                <NavLink
                  to="creargrados"
                  className={({ isActive }) =>
                    `px-3 py-1 rounded-lg transition-all ${
                      isActive
                        ? "bg-orange-600 text-white"
                        : "hover:bg-orange-700 text-blue-100"
                    }`
                  }
                >
                  Crear Grados
                </NavLink>
              </div>
            </div>
          </div>

          

          <NavLink
            to="eventos"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${
                isActive
                   ? "bg-orange-500 text-white font-semibold"
                  : "hover:bg-orange-600 text-blue-100"
              }`
            }
          >
            <Calendar size={20} /> Eventos
          </NavLink>

          <NavLink
            to="perfil"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${
                isActive
                  ? "bg-orange-500 text-white font-semibold"
                  : "hover:bg-orange-600 text-blue-100"
              }`
            }
          >
            <Users size={20} /> Perfil
          </NavLink>
        </nav>

        <button
  onClick={logout}
  className="m-4 flex items-center justify-center gap-2 py-2.5 rounded-full 
             bg-gradient-to-r from-red-600 to-red-500 text-white font-semibold
             shadow-md hover:from-red-700 hover:to-red-600 transition-all"
>
  <LogOut size={18} /> Cerrar Sesión
</button>

      </aside>

      {/* Contenido principal */}
      <main className="flex-1 flex flex-col">
        {/* Encabezado */}
        <header className="bg-orange-400 shadow-sm p-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-white">
            Bienvenida, {usuario?.nombre || "Directora"}
          </h2>
          <div className="text-sm text-white">
            INEB Telesecundaria El Astillero
          </div>
        </header>

        <section className="flex-1 p-6 bg-gray-100 overflow-auto">
          {usuario ? (
            <Outlet />
          ) : (
            <p className="text-center mt-20 text-gray-500">
              Cargando información del usuario...
            </p>
          )}
        </section>
      </main>
    </div>
  );
}
