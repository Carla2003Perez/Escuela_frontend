export default function VistaAlumnos() {
  return (
    <div className="p-8 min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
      {/* Encabezado */}
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-extrabold text-blue-800 drop-shadow-md">
          Alumnos por Grado
        </h1>
       
      </div>

      {/* Grado 1 */}
      <div className="bg-white shadow-lg rounded-2xl p-6 border-l-4 border-blue-500 mb-8">
        <h2 className="text-2xl font-semibold text-blue-700 mb-4">Primer Grado</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Alumno 1 */}
          <div className="p-4 bg-blue-50 rounded-xl border border-blue-200 shadow-sm hover:shadow-md transition-all">
            <p className="font-semibold text-gray-800">Juan Pérez</p>
            <p className="text-sm text-gray-600">Código: 001</p>
            <button className="mt-3 bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-lg shadow transition-all">
              Ver detalles
            </button>
          </div>
          {/* Alumno 2 */}
          <div className="p-4 bg-blue-50 rounded-xl border border-blue-200 shadow-sm hover:shadow-md transition-all">
            <p className="font-semibold text-gray-800">Eli María Godoy</p>
            <p className="text-sm text-gray-600">Código: 002</p>
            <button className="mt-3 bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-lg shadow transition-all">
              Ver detalles
            </button>
          </div>
         
        </div>
      </div>

      {/* Grado 2 */}
      <div className="bg-white shadow-lg rounded-2xl p-6 border-l-4 border-green-500 mb-8">
        <h2 className="text-2xl font-semibold text-green-700 mb-4">Segundo Grado</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-green-50 rounded-xl border border-green-200 shadow-sm hover:shadow-md transition-all">
            <p className="font-semibold text-gray-800">Ana Ramírez</p>
            <p className="text-sm text-gray-600">Código: 004</p>
            <button className="mt-3 bg-green-600 hover:bg-green-700 text-white px-4 py-1.5 rounded-lg shadow transition-all">
              Ver detalles
            </button>
          </div>
          
        </div>
      </div>

      {/* Grado 3 */}
      <div className="bg-white shadow-lg rounded-2xl p-6 border-l-4 border-yellow-500 mb-8">
        <h2 className="text-2xl font-semibold text-yellow-700 mb-4">Tercer Grado</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-yellow-50 rounded-xl border border-yellow-200 shadow-sm hover:shadow-md transition-all">
            <p className="font-semibold text-gray-800">Sofía Morales</p>
            <p className="text-sm text-gray-600">Código: 006</p>
            <button className="mt-3 bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-1.5 rounded-lg shadow transition-all">
              Ver detalles
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
