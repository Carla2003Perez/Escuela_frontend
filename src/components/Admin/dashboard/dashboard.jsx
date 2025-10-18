export default function Dashboard() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-blue-900 mb-6">
        Panel admini
      </h1>
      <p className="text-gray-700 mb-8">
        Aquí puedes ver estadísticas generales del instituto, revisar reportes académicos y gestionar docentes y alumnos.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-blue-100 to-blue-200 p-6 rounded-xl shadow-lg text-center transform hover:scale-105 transition-transform duration-300">
          <h2 className="text-2xl sm:text-xl font-extrabold text-blue-800 mb-2">93 Estudiantes</h2>
          <p className="text-sm text-gray-600">Matriculados actualmente</p>
        </div>

        <div className="bg-gradient-to-br from-blue-100 to-blue-200 p-6 rounded-xl shadow-lg text-center transform hover:scale-105 transition-transform duration-300">
          <h2 className="text-2xl sm:text-xl font-extrabold text-blue-800 mb-2">8 Docentes</h2>
          <p className="text-sm text-gray-600">Activos este ciclo</p>
        </div>

        <div className="bg-gradient-to-br from-blue-100 to-blue-200 p-6 rounded-xl shadow-lg text-center transform hover:scale-105 transition-transform duration-300">
          <h2 className="text-2xl sm:text-xl font-extrabold text-blue-800 mb-2">12 Reportes</h2>
          <p className="text-sm text-gray-600">Generados este mes</p>
        </div>
      </div>
    </div>
  );
}
