import { useEffect, useState } from "react";
import { obtenerEstudiantes, inactivarEstudiante } from "../../Services/estudianteService";

export default function VistaAlumno() {
  const [estudiantes, setEstudiantes] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    cargarEstudiantes();
  }, []);

  const cargarEstudiantes = async () => {
    try {
      const data = await obtenerEstudiantes();
      setEstudiantes(data);
    } catch (err) {
      console.error(err);
      setError("No se pudieron cargar los estudiantes");
    }
  };

  const handleInactivar = async (id) => {
    if (!window.confirm("¿Deseas inactivar esta cuenta de estudiante?")) return;

    try {
      await inactivarEstudiante(id);
      alert("Cuenta inactivada correctamente");
      cargarEstudiantes();
    } catch (err) {
      console.error(err);
      alert("Error al inactivar la cuenta");
    }
  };

  const handleEditar = (id) => {
    // Aquí podrías redirigir a una vista de edición o abrir un modal
    alert(`Editar estudiante con ID: ${id}`);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold text-indigo-700 mb-4">
        Lista de Estudiantes
      </h1>

      {error && <p className="text-red-600">{error}</p>}

      <div className="overflow-x-auto rounded-lg shadow-lg">
        <table className="w-full border-collapse border border-gray-300">
          <thead className="bg-indigo-600 text-white">
            <tr>
              <th className="py-2 px-3">#</th>
              <th className="py-2 px-3 text-left">Nombre</th>
              <th className="py-2 px-3 text-left">Código</th>
              <th className="py-2 px-3 text-left">Grado</th>
              <th className="py-2 px-3 text-left">Fecha de Nacimiento</th>
              <th className="py-2 px-3 text-left">Responsable</th>
              <th className="py-2 px-3 text-left">Correo</th>
              <th className="py-2 px-3 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {estudiantes.length > 0 ? (
              estudiantes.map((e, index) => (
                <tr
                  key={e.id_estudiante}
                  className="border-t hover:bg-gray-100 transition-all"
                >
                  <td className="py-2 px-3 text-center">{index + 1}</td>
                  <td className="py-2 px-3">{e.Nombre_estudiante}</td>
                  <td className="py-2 px-3">{e.codigo_estudiante}</td>
                  <td className="py-2 px-3">{e.grado?.nombre_grado || "Sin grado"}</td>

                  <td className="py-2 px-3">{e.fecha_nacimiento}</td>
                  <td className="py-2 px-3">{e.responsable}</td>
                  <td className="py-2 px-3">{e.usuario?.correo}</td>
                  <td className="py-2 px-3 text-center">
                    <button
                      onClick={() => handleEditar(e.id_estudiante)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded mr-2 text-sm"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleInactivar(e.id_estudiante)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                    >
                      Inactivar
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="8"
                  className="text-center py-4 text-gray-500 italic"
                >
                  No hay estudiantes registrados
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
