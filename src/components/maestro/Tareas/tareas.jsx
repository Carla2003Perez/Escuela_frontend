export default function Tareas() {
  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Título */}
      <h1 className="text-3xl font-extrabold text-blue-900 mb-8">
        Crear Materias
      </h1>

      {/* Formulario */}
      <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200 max-w-3xl mx-auto">
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">
            Nombre de la materia
          </label>
          <input
            type="text"
            placeholder="Ej: Matemáticas"
            className="w-full px-5 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">
            Código de la materia
          </label>
          <input
            type="text"
            placeholder="Ej: MAT101"
            className="w-full px-5 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">
            Grado asignado
          </label>
          <select className="w-full px-5 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all">
            <option value="">Selecciona un grado</option>
            <option value="1">1° Grado</option>
            <option value="2">2° Grado</option>
            <option value="3">3° Grado</option>
          </select>
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">
            Descripción
          </label>
          <textarea
            placeholder="Breve descripción de la materia"
            className="w-full px-5 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none"
            rows={4}
          />
        </div>

        <button className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded-xl shadow-md font-semibold transition-all w-full">
          Guardar Materia
        </button>
      </div>

      {/* Materias creadas */}
      <div className="mt-12 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-blue-900 mb-6">Materias creadas</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl shadow border-l-4 border-blue-600 hover:shadow-lg transition-all">
            <h3 className="font-bold text-blue-700 text-lg mb-1">Matemáticas</h3>
            <p className="text-gray-600 text-sm">Grado: 1° | Código: MAT101</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow border-l-4 border-blue-600 hover:shadow-lg transition-all">
            <h3 className="font-bold text-blue-700 text-lg mb-1">Lengua</h3>
            <p className="text-gray-600 text-sm">Grado: 2° | Código: LEN102</p>
          </div>
        </div>
      </div>
    </div>
  );
}
