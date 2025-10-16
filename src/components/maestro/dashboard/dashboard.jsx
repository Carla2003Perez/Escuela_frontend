export default function Dashboard() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold text-green-900 mb-4">
        Panel del Maestro
      </h1>
      <p className="text-gray-700">
        Aquí puedes registrar calificaciones, revisar tus materias asignadas y comunicarte con tus alumnos.
      </p>

      <div className="grid grid-cols-2 gap-4 mt-6">
        <div className="bg-green-100 p-6 rounded-lg shadow text-center">
          <h2 className="text-xl font-bold text-green-800">5 Materias</h2>
          <p className="text-sm text-gray-600">Asignadas este ciclo</p>
        </div>
        <div className="bg-green-100 p-6 rounded-lg shadow text-center">
          <h2 className="text-xl font-bold text-green-800">3 Reportes</h2>
          <p className="text-sm text-gray-600">Pendientes de revisión</p>
        </div>
      </div>
    </div>
  );
}
