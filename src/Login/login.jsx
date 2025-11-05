import { useState, useContext } from "react";
import { AuthContext } from "../AuthProvider";
import { useNavigate } from "react-router-dom";
import { Box, Paper, Typography, TextField, Button } from "@mui/material";

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // resetear error

    try {
      const res = await fetch("http://localhost:3001/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ correo, contrasena }),
      });

      if (!res.ok) {
        setError("Credenciales incorrectas");
        return;
      }

      const data = await res.json();
      console.log("Datos recibidos del backend:", data);

      // Guardar usuario y token en localStorage
      localStorage.setItem("token", data.access_token);
      localStorage.setItem("user", JSON.stringify(data.usuario));
   


      // Actualizar contexto con el usuario
      login(data.usuario);

      // Redirigir según el rol
      const userRole = data.usuario.rol?.Nombre_Rol.toLowerCase();

      if (userRole === "directora") {
        navigate("/directora");
      } else if (userRole === "docente") {
        navigate("/maestro");
      } else if (userRole === "estudiante") {
        navigate("/alumno");
      } else {
        navigate("/login");
      }

    } catch (err) {
      console.error("Error al iniciar sesión:", err);
      setError("Error de conexión con el servidor");
    }
  };

    return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-400 via-blue-300 to-sky-200">
      <div className="bg-white/80 backdrop-blur-md shadow-2xl rounded-2xl px-10 py-8 w-full max-w-md animate-fadeIn">
        <h2 className="text-3xl font-bold text-center text-indigo-700 mb-6">
          Iniciar sesión
        </h2>

        {error && (
          <p className="text-red-600 text-sm text-center mb-3">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Correo institucional
            </label>
            <input
              type="email"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="ejemplo@correo.edu.gt"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Contraseña
            </label>
            <input
              type="password"
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="********"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 rounded-lg shadow-md transition-transform transform hover:scale-[1.02] active:scale-95"
          >
            Ingresar
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          © {new Date().getFullYear()} INEB Telesecundaria El Astillero
        </p>
      </div>
    </div>
  );
}