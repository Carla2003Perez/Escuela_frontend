export default function Dashboard() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold text-purple-900 mb-4">
        Bienvenido, Alumno
      </h1>
      <p className="text-gray-700">
        Consulta tus materias, calificaciones y tareas asignadas aquí.
      </p>

      <div className="grid grid-cols-2 gap-4 mt-6">
        <div className="bg-purple-100 p-6 rounded-lg shadow text-center">
          <h2 className="text-xl font-bold text-purple-800">6 Materias</h2>
          <p className="text-sm text-gray-600">Asignadas este semestre</p>
        </div>
        <div className="bg-purple-100 p-6 rounded-lg shadow text-center">
          <h2 className="text-xl font-bold text-purple-800">4 Tareas</h2>
          <p className="text-sm text-gray-600">Pendientes por entregar</p>
        </div>
      </div>
    </div>
  );
}
