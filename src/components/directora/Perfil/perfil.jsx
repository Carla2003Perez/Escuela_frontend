// src/maestro/perfil/Perfilestu.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  EyeIcon,
  EyeSlashIcon,
  XMarkIcon,
  LockClosedIcon,
  
} from "@heroicons/react/24/outline";

export default function Perfil() {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [rolNombre, setRolNombre] = useState("");
  const [mostrarCambio, setMostrarCambio] = useState(false);

  // Campos de contraseña
  const [actual, setActual] = useState("");
  const [nueva, setNueva] = useState("");
  const [confirmar, setConfirmar] = useState("");
  const [mensaje, setMensaje] = useState(null);
  const [cargando, setCargando] = useState(false);

  // Mostrar/Ocultar contraseña
  const [verActual, setVerActual] = useState(false);
  const [verNueva, setVerNueva] = useState(false);
  const [verConfirmar, setVerConfirmar] = useState(false);

  // Simula carga del usuario (de localStorage)
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser) {
      navigate("/login");
      return;
    }
    setUser(storedUser);
    setRolNombre(storedUser.rol || "Usuario");
  }, [navigate]);

  const handleSubmitCambio = async (e) => {
    e.preventDefault();
    if (nueva !== confirmar) {
      setMensaje({ tipo: "error", texto: "Las contraseñas no coinciden" });
      return;
    }
    try {
      setCargando(true);
      // Simula petición al backend
      await new Promise((r) => setTimeout(r, 1500));
      setMensaje({ tipo: "ok", texto: "Contraseña actualizada con éxito" });
      setActual("");
      setNueva("");
      setConfirmar("");
    } catch (error) {
      setMensaje({ tipo: "error", texto: "Error al cambiar la contraseña" });
    } finally {
      setCargando(false);
    }
  };

  // 🔒 Cerrar sesión
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="relative max-w-2xl mx-auto bg-gradient-to-br from-blue-50 to-white rounded-3xl shadow-xl p-8 mt-10 border border-blue-100">
      {/* Encabezado */}
      <div className="text-center text-base">
        <h1 className="text-4xl font-extrabold text-black">Bienvenido {rolNombre}</h1>
        <h2 className="mt-2 font-medium leading-tight break-all !text-slate-900 text-[22px] sm:text-[26px] md:text-[30px] lg:text-[34px]">
          {user.correo}
        </h2>
      </div>

      {/* Botón cerrar sesión */}
      <button
        onClick={handleLogout}
        className="w-full mt-6 flex items-center justify-center gap-3 px-6 py-4 rounded-2xl bg-red-600 text-white font-semibold hover:bg-red-700 transition text-lg shadow-md"
      >
        <ArrowLeftOnRectangleIcon className="h-6 w-6" />
        Cerrar sesión
      </button>

      <div className="mt-6" />

      {/* Botón Cambiar contraseña */}
      <button
        onClick={() => setMostrarCambio((v) => !v)}
        className="w-full flex items-center justify-center gap-3 px-6 py-4 rounded-2xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition text-lg shadow-md"
      >
        <LockClosedIcon className="h-6 w-6" />
        {mostrarCambio ? "Cancelar" : "Cambiar contraseña"}
      </button>

      {/* Panel de cambio de contraseña */}
      {mostrarCambio && (
        <form
          onSubmit={handleSubmitCambio}
          className="mt-8 p-6 border border-blue-200 rounded-2xl bg-white shadow-sm space-y-4"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-black">Cambiar contraseña</h3>
            <button
              type="button"
              onClick={() => setMostrarCambio(false)}
              className="p-2 rounded-lg hover:bg-slate-100"
              title="Cerrar"
            >
              <XMarkIcon className="h-6 w-6 text-slate-600" />
            </button>
          </div>

          {/* Contraseña actual */}
          <div className="relative">
            <label className="block text-black font-medium mb-1">Contraseña actual</label>
            <input
              type={verActual ? "text" : "password"}
              value={actual}
              onChange={(e) => setActual(e.target.value)}
              className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 pr-12"
              required
            />
            <button
              type="button"
              onClick={() => setVerActual((v) => !v)}
              className="absolute right-3 top-10 text-gray-500 hover:text-gray-700"
            >
              {verActual ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
            </button>
          </div>

          {/* Nueva */}
          <div className="relative">
            <label className="block text-black font-medium mb-1">Nueva contraseña</label>
            <input
              type={verNueva ? "text" : "password"}
              value={nueva}
              onChange={(e) => setNueva(e.target.value)}
              className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 pr-12"
              required
            />
            <button
              type="button"
              onClick={() => setVerNueva((v) => !v)}
              className="absolute right-3 top-10 text-gray-500 hover:text-gray-700"
            >
              {verNueva ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
            </button>
          </div>

          {/* Confirmar */}
          <div className="relative">
            <label className="block text-black font-medium mb-1">Confirmar nueva contraseña</label>
            <input
              type={verConfirmar ? "text" : "password"}
              value={confirmar}
              onChange={(e) => setConfirmar(e.target.value)}
              className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 pr-12"
              required
            />
            <button
              type="button"
              onClick={() => setVerConfirmar((v) => !v)}
              className="absolute right-3 top-10 text-gray-500 hover:text-gray-700"
            >
              {verConfirmar ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
            </button>
          </div>

          {/* Mensaje */}
          {mensaje && (
            <div
              className={`p-3 rounded-lg text-center font-medium ${
                mensaje.tipo === "ok"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {mensaje.texto}
            </div>
          )}

          <button
            type="submit"
            disabled={cargando}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition"
          >
            {cargando ? "Guardando..." : "Guardar nueva contraseña"}
          </button>
        </form>
      )}
    </div>
  );
}
