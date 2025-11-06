import { useState, useContext } from "react";
import { AuthContext } from "../AuthProvider";
import { useNavigate } from "react-router-dom";
import logo from "./logo.png";
import "./login.css";
export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

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
      localStorage.setItem("token", data.access_token);
      localStorage.setItem("user", JSON.stringify(data.usuario));
      login(data.usuario);

      const userRole = data.usuario.rol?.Nombre_Rol.toLowerCase();
      if (userRole === "directora") navigate("/directora");
      else if (userRole === "docente") navigate("/maestro");
      else if (userRole === "estudiante") navigate("/alumno");
      else navigate("/login");
    } catch (err) {
      console.error("Error al iniciar sesión:", err);
      setError("Error de conexión con el servidor");
    }
  };

    return (
    <div className="header-container">
      <div className="login-card">
        <div className="text-center mb-6">
          <img src={logo} alt="Logo INEB Telesecundaria" className="logo" />
          <h2 className="header-text">INEB Telesecundaria</h2>
          <p className="slogan">“Educando para un futuro mejor”</p>
        </div>

       

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
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
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
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="********"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2.5 rounded-lg shadow-md transition-transform transform hover:scale-[1.02] active:scale-95"
          >
            Ingresar
          </button>

           {error && <p className="text-red-600 text-sm text-center mb-3">{error}</p>}
        </form>

        <p className="text-center text-sm text-gray-600 mt-8">
          © {new Date().getFullYear()} Aldea El Astillero, Guazacapán
        </p>
      </div>
    </div>
  );
}