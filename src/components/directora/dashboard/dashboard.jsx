export default function Dashboard() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold text-blue-900 mb-4">
        Panel de Control - Directora
      </h1>
      <p className="text-gray-700">
        Aquí puedes ver estadísticas generales del instituto, revisar reportes académicos y gestionar docentes y alumnos.
      </p>

      <div className="grid grid-cols-3 gap-4 mt-6">
        <div className="bg-blue-100 p-6 rounded-lg shadow text-center">
          <h2 className="text-xl font-bold text-blue-800">93 Estudiantes</h2>
          <p className="text-sm text-gray-600">Matriculados actualmente</p>
        </div>
        <div className="bg-blue-100 p-6 rounded-lg shadow text-center">
          <h2 className="text-xl font-bold text-blue-800">8 Docentes</h2>
          <p className="text-sm text-gray-600">Activos este ciclo</p>
        </div>
        <div className="bg-blue-100 p-6 rounded-lg shadow text-center">
          <h2 className="text-xl font-bold text-blue-800">12 Reportes</h2>
          <p className="text-sm text-gray-600">Generados este mes</p>
        </div>
      </div>
    </div>
  );
}
