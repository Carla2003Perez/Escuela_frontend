import { useState, useEffect } from "react";
import { crearGrado, obtenerGrados, asignarDocenteAGrado } from "../../Services/gradoService";
import { obtenerDocentes } from "../../Services/docenteService";

export default function CrearGrado() {
  const [nombreGrado, setNombreGrado] = useState("");
  const [grados, setGrados] = useState([]);
  const [docentes, setDocentes] = useState([]);
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");

  // Cargar grados y docentes al iniciar
  useEffect(() => {
    cargarGrados();
    cargarDocentes();
  }, []);

  const cargarGrados = async () => {
    try {
      const data = await obtenerGrados();
      setGrados(data);
    } catch (err) {
      console.error(err);
    }
  };

  const cargarDocentes = async () => {
    try {
      const data = await obtenerDocentes();
      setDocentes(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCrearGrado = async (e) => {
    e.preventDefault();
    try {
      const data = await crearGrado({ nombre_grado: nombreGrado });
      setMensaje(`Grado "${data.nombre_grado}" creado con éxito`);
      setError("");
      setNombreGrado("");
      cargarGrados(); // refrescar lista
    } catch (err) {
      setError(err.message);
      setMensaje("");
    }
  };

  const handleAsignarDocente = async (gradoId, docenteId) => {
    try {
      await asignarDocenteAGrado(gradoId, docenteId);
      setMensaje("Docente asignado correctamente");
      setError("");
    } catch (err) {
      setError(err.message);
      setMensaje("");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-blue-900 mb-6">Crear Grado</h1>

      {mensaje && <p className="text-green-600 mb-4">{mensaje}</p>}
      {error && <p className="text-red-600 mb-4">{error}</p>}

      {/* Formulario para crear grado */}
      <form onSubmit={handleCrearGrado} className="mb-6 space-y-3">
        <input
          type="text"
          placeholder="Nombre del grado"
          value={nombreGrado}
          onChange={(e) => setNombreGrado(e.target.value)}
          className="border p-2 rounded w-full"
          required
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Crear Grado
        </button>
      </form>

      {/* Lista de grados con select de docentes */}
      <div className="space-y-4">
        {grados.map((grado) => (
          <div key={grado.id_grado} className="p-4 border rounded shadow">
            <p className="font-semibold mb-2">{grado.nombre_grado}</p>
            <select
              defaultValue=""
              onChange={(e) => handleAsignarDocente(grado.id_grado, e.target.value)}
              className="border p-2 rounded w-full"
            >
              <option value="">Selecciona un docente</option>
              {docentes.map((docente) => (
                <option key={docente.id_docente} value={docente.id_docente}>
                  {docente.nombre_docente}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>
    </div>
  );
}
