import { useState, useEffect } from "react";
import {
  crearEstudiante,
  obtenerEstudiantes,
} from "../../Services/estudianteService";
import {
  crearDocente,
  obtenerDocentes,
} from "../../Services/docenteService";
import { obtenerGrados } from "../../Services/gradoService";

const camposIniciales = {
  estudiante: {
    Nombre_estudiante: "",
    apellido_estudiante: "",
    codigo_estudiante: "",
    grado: "",
    fecha_nacimiento: "",
    responsable: "",
  },
  docente: {
    nombre_docente: "",
    apellido: "",
    telefono: "",
    fecha_ingreso: "",
  },
};

export default function Crearusuario() {
  const [tipoUsuario, setTipoUsuario] = useState("estudiante");
  const [formData, setFormData] = useState(camposIniciales);
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");
  const [credenciales, setCredenciales] = useState(null);
  const [grados, setGrados] = useState([]);
  const [docentes, setDocentes] = useState([]);

  useEffect(() => {
    const fetchDatos = async () => {
      try {
        const gradosData = await obtenerGrados();
        setGrados(
          Array.isArray(gradosData)
            ? gradosData
            : gradosData.data || []
        );

        const docentesData = await obtenerDocentes();
        setDocentes(
          Array.isArray(docentesData)
            ? docentesData
            : docentesData.data || []
        );
      } catch (err) {
        console.error("Error al obtener datos:", err);
      }
    };
    fetchDatos();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [tipoUsuario]: {
        ...prev[tipoUsuario],
        [name]: value,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let data;
      if (tipoUsuario === "estudiante") {
        const {
          Nombre_estudiante,
          apellido_estudiante,
          codigo_estudiante,
          id_grado,
          fecha_nacimiento,
          responsable,
        } = formData.estudiante;
        data = await crearEstudiante({
          Nombre_estudiante,
          apellido_estudiante,
          codigo_estudiante,
          grado,
          fecha_nacimiento,
          responsable,
        });
        setFormData((prev) => ({
          ...prev,
          estudiante: camposIniciales.estudiante,
        }));
        setMensaje(`✅ Estudiante creado con éxito`);
      } else {
        const { nombre_docente, apellido, telefono, fecha_ingreso } =
          formData.docente;
        data = await crearDocente({
          nombre_docente,
          apellido,
          telefono,
          fecha_ingreso,
        });
        setFormData((prev) => ({
          ...prev,
          docente: camposIniciales.docente,
        }));
        setMensaje(`✅ Docente creado con éxito`);
      }

      if (data?.correo && data?.contrasena) {
        setCredenciales({
          correo: data.correo,
          contrasena: data.contrasena,
        });
      } else if (data?.usuario) {
        setCredenciales({
          correo: data.usuario.correo,
          contrasena: data.usuario.contrasena,
        });
      } else {
        setCredenciales(null);
      }

      setError("");
    } catch (err) {
      console.error("Error al crear usuario:", err);
      setError(err.message || "Ocurrió un error al crear el usuario.");
      setMensaje("");
      setCredenciales(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex items-center justify-center p-6">
      <div className="w-full max-w-3xl bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl p-10 border border-gray-200">
        <h1 className="text-4xl font-bold text-violet-600 mb-8 text-center">
          Crear Usuarios
        </h1>



      

        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">
            Tipo de Usuario
          </label>
          <select
            value={tipoUsuario}
            onChange={(e) => setTipoUsuario(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 text-gray-700 focus:ring-2 focus:ring-blue-400 outline-none transition"
          >
            <option value="estudiante">Estudiante</option>
            <option value="docente">Docente</option>
          </select>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-4 bg-gray-50 border border-gray-200 rounded-xl p-6 shadow-inner"
        >
          {tipoUsuario === "estudiante" ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="Nombre_estudiante"
                  placeholder="Nombre del Estudiante"
                  value={formData.estudiante.Nombre_estudiante}
                  onChange={handleChange}
                  className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                />
                <input
                  type="text"
                  name="apellido_estudiante"
                  placeholder="Apellido del Estudiante"
                  value={formData.estudiante.apellido_estudiante}
                  onChange={handleChange}
                  className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                />
              </div>

              <input
                type="text"
                name="codigo_estudiante"
                placeholder="Código del Estudiante"
                value={formData.estudiante.codigo_estudiante}
                onChange={handleChange}
                className="border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-400 outline-none"
              />

              <select
                name="grado"
                value={formData.estudiante.grado}
                onChange={handleChange}
                className="border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-400 outline-none"
              >
                <option value="">Seleccione un grado</option>
                {grados.map((g) => (
                  <option key={g.id_grado} value={g.id_grado}>
                    {g.nombre_grado}
                  </option>
                ))}
              </select>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="date"
                  name="fecha_nacimiento"
                  value={formData.estudiante.fecha_nacimiento}
                  onChange={handleChange}
                  className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                />
                <input
                  type="text"
                  name="responsable"
                  placeholder="Responsable"
                  value={formData.estudiante.responsable}
                  onChange={handleChange}
                  className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                />
              </div>
            </>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="nombre_docente"
                  placeholder="Nombre del Docente"
                  value={formData.docente.nombre_docente}
                  onChange={handleChange}
                  className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                />
                <input
                  type="text"
                  name="apellido"
                  placeholder="Apellido"
                  value={formData.docente.apellido}
                  onChange={handleChange}
                  className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                />
              </div>

              <input
                type="text"
                name="telefono"
                placeholder="Teléfono"
                value={formData.docente.telefono}
                onChange={handleChange}
                className="border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-400 outline-none"
              />

              <input
                type="date"
                name="fecha_ingreso"
                value={formData.docente.fecha_ingreso}
                onChange={handleChange}
                className="border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-400 outline-none"
              />
            </>
          )}

          <button
            type="submit"
            className="bg-orange-400 text-white px-6 py-3 rounded-lg w-full font-semibold hover:bg-orange-500 shadow-md transition-transform transform hover:scale-[1.03] active:scale-[0.98]"
          >
            Crear {tipoUsuario.charAt(0).toUpperCase() + tipoUsuario.slice(1)}
          </button>
                  {mensaje && (
          <p className="bg-green-100 text-green-800 border border-green-300 px-4 py-3 rounded-lg mb-4 text-center font-medium animate-fade-in">
            {mensaje}
          </p>
        )}
        {error && (
          <p className="bg-red-100 text-red-800 border border-red-300 px-4 py-3 rounded-lg mb-4 text-center font-medium animate-fade-in">
            {error}
          </p>
        )}
          {credenciales && (
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 mb-6 shadow-sm">
            <h2 className="font-semibold text-blue-900 mb-2">
              🔐 Credenciales generadas:
            </h2>
            <p>
              <strong>Correo:</strong> {credenciales.correo}
            </p>
            <p>
              <strong>Contraseña:</strong> {credenciales.contrasena}
            </p>
          </div>
        )}
        </form>
      </div>
    </div>
  );
}
