import { useState, useEffect } from "react";
import { crearEstudiante } from "../../Services/estudianteService";
import { crearDocente } from "../../Services/docenteService";
import { obtenerGrados } from "../../Services/gradoService"; // importamos el service

const camposIniciales = {
  estudiante: {
    Nombre_estudiante: "",
    codigo_estudiante: "",
    grado: "",
    fecha_nacimiento: "",
    responsable: "",
  },
  docente: {
    nombre_docente: "",
    telefono: "",
    fecha_ingreso: "",
  },
};

export default function Crearusuario() {
  const [tipoUsuario, setTipoUsuario] = useState("estudiante");
  const [formData, setFormData] = useState(camposIniciales);
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");
  const [grados, setGrados] = useState([]); // estado para los grados

  // Obtener los grados al cargar
  useEffect(() => {
    const fetchGrados = async () => {
      try {
        const data = await obtenerGrados();
        setGrados(data);
      } catch (err) {
        console.error("Error al obtener grados:", err);
      }
    };
    fetchGrados();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [tipoUsuario]: { ...formData[tipoUsuario], [name]: value },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let data;
      if (tipoUsuario === "estudiante") {
        data = await crearEstudiante(formData.estudiante);
        setFormData({ ...formData, estudiante: camposIniciales.estudiante });
        setMensaje(`Estudiante ${data.Nombre_estudiante} creado con éxito`);
      } else {
        data = await crearDocente(formData.docente);
        setFormData({ ...formData, docente: camposIniciales.docente });
        setMensaje(`Docente ${data.nombre_docente} creado con éxito`);
      }
      setError("");
    } catch (err) {
      setError(err.message);
      setMensaje("");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-blue-900 mb-6">Crear usuarios</h1>
     

      {mensaje && <p className="text-green-600 mb-4">{mensaje}</p>}
      {error && <p className="text-red-600 mb-4">{error}</p>}

      {/* Selector de tipo */}
      <div className="mb-4">
        <select
          value={tipoUsuario}
          onChange={(e) => setTipoUsuario(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="estudiante">Estudiante</option>
          <option value="docente">Docente</option>
        </select>
      </div>

      {/* Formulario */}
      <form onSubmit={handleSubmit} className="space-y-3 p-4 border rounded shadow">
        {tipoUsuario === "estudiante" ? (
          <>
            <input
              type="text"
              name="Nombre_estudiante"
              placeholder="Nombre"
              value={formData.estudiante.Nombre_estudiante}
              onChange={handleChange}
              className="border p-2 rounded w-full"
            />
            <input
              type="text"
              name="codigo_estudiante"
              placeholder="Código"
              value={formData.estudiante.codigo_estudiante}
              onChange={handleChange}
              className="border p-2 rounded w-full"
            />
            <select
              name="grado"
              value={formData.estudiante.grado}
              onChange={handleChange}
              className="border p-2 rounded w-full"
            >
              <option value="">Seleccione un grado</option>
              {grados.map((g) => (
                <option key={g.id_grado} value={g.nombre_grado}>
                  {g.nombre_grado}
                </option>
              ))}
            </select>
            <input
              type="date"
              name="fecha_nacimiento"
              value={formData.estudiante.fecha_nacimiento}
              onChange={handleChange}
              className="border p-2 rounded w-full"
            />
            <input
              type="text"
              name="responsable"
              placeholder="Responsable"
              value={formData.estudiante.responsable}
              onChange={handleChange}
              className="border p-2 rounded w-full"
            />
          </>
        ) : (
          <>
            <input
              type="text"
              name="nombre_docente"
              placeholder="Nombre"
              value={formData.docente.nombre_docente}
              onChange={handleChange}
              className="border p-2 rounded w-full"
            />
            <input
              type="text"
              name="telefono"
              placeholder="Teléfono"
              value={formData.docente.telefono}
              onChange={handleChange}
              className="border p-2 rounded w-full"
            />
            <input
              type="date"
              name="fecha_ingreso"
              value={formData.docente.fecha_ingreso}
              onChange={handleChange}
              className="border p-2 rounded w-full"
            />
          </>
        )}
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded w-full">
          Crear {tipoUsuario.charAt(0).toUpperCase() + tipoUsuario.slice(1)}
        </button>
      </form>
    </div>
  );
}
