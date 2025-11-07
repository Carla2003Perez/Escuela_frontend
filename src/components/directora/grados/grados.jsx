// grados.jsx
import { useState, useEffect } from "react";
import {
  crearGrado,
  obtenerGrados,
  asignarDocenteAGrado,
} from "../../Services/gradoService";
import { obtenerDocentes } from "../../Services/docenteService";

export default function CrearGrado() {
  const [nombreGrado, setNombreGrado] = useState("");
  const [grados, setGrados] = useState([]);
  const [docentes, setDocentes] = useState([]);
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    cargarGrados();
    cargarDocentes();
  }, []);

  const cargarGrados = async () => {
  try {
    const data = await obtenerGrados();

    const gradosSeguros = data.map((grado) => ({
      ...grado,
      docentes: Array.isArray(grado.docentes) ? grado.docentes : [],
    }));

    setGrados(gradosSeguros);
  } catch (err) {
    setError("Error al cargar grados");
    console.error(err);
  }
};

  const cargarDocentes = async () => {
    try {
      const data = await obtenerDocentes();
      setDocentes(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error al cargar docentes:", err);
    }
  };

  const handleCrearGrado = async (e) => {
    e.preventDefault();
    if (!nombreGrado.trim()) return;

    try {
      await crearGrado({ nombre_grado: nombreGrado });
      setNombreGrado("");
      setMensaje("Grado creado con éxito");
      await cargarGrados();
    } catch (err) {
      setError(err.message || "Error al crear grado");
    }
  };

  const handleGuardar = async (gradoId) => {
  const grado = grados.find((g) => g.id_grado === gradoId);
  const docentesIds = grado.docentes.map((d) => d.id_docente);

  try {
    // GUARDAR EN BACKEND
    await Promise.all(
      docentesIds.map((id) => asignarDocenteAGrado(gradoId, id))
    );

    setMensaje("Docentes asignados correctamente");

    // RECARGAR DESDE BACKEND (ESTO ES LA CLAVE)
    await cargarGrados(); // ← SIN ESTO, NO SE PERSISTE AL F5
  } catch (err) {
    setError(err.message || "Error al guardar");
  }
};
  const removerDocente = (gradoId, docenteId) => {
    setGrados((prev) =>
      prev.map((g) =>
        g.id_grado === gradoId
          ? { ...g, docentes: g.docentes.filter((d) => d.id_docente !== docenteId) }
          : g
      )
    );
  };

  const agregarDocenteTemporal = (gradoId, docenteId) => {
    const docente = docentes.find((d) => d.id_docente === docenteId);
    if (!docente) return;

    setGrados((prev) =>
      prev.map((g) =>
        g.id_grado === gradoId
          ? { ...g, docentes: [...g.docentes, docente] }
          : g
      )
    );
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-blue-900 mb-8">Gestión de Grados</h1>

      {mensaje && (
        <p className="bg-green-100 text-green-700 p-3 rounded mb-4 animate-fade">
          {mensaje}
        </p>
      )}
      {error && (
        <p className="bg-red-100 text-red-700 p-3 rounded mb-4 animate-fade">
          {error}
        </p>
      )}

      {/* Crear nuevo grado */}
      <form onSubmit={handleCrearGrado} className="mb-8 bg-white p-6 rounded-lg shadow">
        <input
          type="text"
          placeholder="Nombre del grado"
          value={nombreGrado}
          onChange={(e) => setNombreGrado(e.target.value)}
          className="border border-gray-300 p-3 rounded-lg w-full mb-3 focus:ring-2 focus:ring-blue-500"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-5 py-2.5 rounded-lg hover:bg-blue-700 transition"
        >
          Crear Grado
        </button>
      </form>

      {/* Lista de grados */}
      <div className="space-y-6">
        {grados.length === 0 ? (
          <p className="text-gray-500 text-center">No hay grados creados</p>
        ) : (
          grados.map((grado) => {
            const docentesAsignados = grado.docentes;
            const docentesDisponibles = docentes.filter(
              (d) => !docentesAsignados.some((a) => a.id_docente === d.id_docente)
            );

            return (
              <div
                key={grado.id_grado}
                className="bg-white p-6 rounded-xl shadow-md border border-gray-200"
              >
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  {grado.nombre_grado}
                </h3>

                {/* DOCENTES ASIGNADOS */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {docentesAsignados.length > 0 ? (
                    docentesAsignados.map((docente) => (
                      <div
                        key={docente.id_docente}
                        className="group flex items-center gap-2 bg-teal-100 text-teal-800 px-3 py-1.5 rounded-full text-sm font-medium"
                      >
                        <div className="w-6 h-6 bg-teal-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                          {docente.nombre_docente[0]}
                        </div>
                        <span className="max-w-32 truncate">
                          {docente.nombre_docente} {docente.apellido}
                        </span>
                        <button
                          onClick={() => removerDocente(grado.id_grado, docente.id_docente)}
                          className=" ml-1 text-teal-600 hover:text-red-600 font-bold transition"
                        >
                          X
                        </button>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 italic text-sm">Sin docentes asignados</p>
                  )}
                </div>

                {/* SELECT + GUARDAR (siempre visible si hay docentes disponibles) */}
                {docentesDisponibles.length > 0 && (
                  <div className="flex gap-2 items-center">
                    <select
                      onChange={(e) => {
                        const id = e.target.value;
                        if (id) {
                          agregarDocenteTemporal(grado.id_grado, id);
                         
                        }
                      }}
                      className="border border-gray-300 p-2.5 rounded-lg text-sm flex-1 focus:ring-2 focus:ring-green-500"
                      defaultValue=""
                    >
                      <option value="" disabled>
                         Agregar docente
                      </option>
                      {docentesDisponibles.map((docente) => (
                        <option key={docente.id_docente} value={docente.id_docente}>
                          {docente.nombre_docente} {docente.apellido}
                        </option>
                      ))}
                    </select>

                    <button
                      onClick={() => handleGuardar(grado.id_grado)}
                      className="bg-green-600 text-white px-4 py-2.5 rounded-lg hover:bg-green-700 text-sm transition"
                    >
                      Guardar
                    </button>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}