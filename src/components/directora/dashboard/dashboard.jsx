import { Users, BookOpen, FileText } from "lucide-react";

export default function Dashboard() {
  const fechaActual = new Date().toLocaleDateString("es-GT", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Encabezado */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-blue-900 mb-2">
          DASHBOARD
        </h1>
        <p className="text-gray-600 text-lg">
          Bienvenida al sistema académico del INEB Telesecundaria El Astillero.
        </p>
        <p className="text-sm text-gray-500 mt-1">{fechaActual}</p>
      </div>

      {/* Tarjetas estadísticas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Estudiantes */}
        <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 border-t-4 border-blue-600">
          <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-4 mx-auto">
            <Users size={26} className="text-blue-700" />
          </div>
          <h2 className="text-3xl font-extrabold text-blue-900 mb-2 text-center">
            93
          </h2>
          <p className="text-gray-700 font-medium text-center">
            Estudiantes Matriculados
          </p>
        </div>

        {/* Docentes */}
        <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 border-t-4 border-green-600">
          <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-4 mx-auto">
            <BookOpen size={26} className="text-green-700" />
          </div>
          <h2 className="text-3xl font-extrabold text-green-900 mb-2 text-center">
            8
          </h2>
          <p className="text-gray-700 font-medium text-center">
            Docentes Activos
          </p>
        </div>

        {/* Reportes */}
        <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 border-t-4 border-yellow-500">
          <div className="flex items-center justify-center w-12 h-12 bg-yellow-100 rounded-full mb-4 mx-auto">
            <FileText size={26} className="text-yellow-600" />
          </div>
          <h2 className="text-3xl font-extrabold text-yellow-800 mb-2 text-center">
            12
          </h2>
          <p className="text-gray-700 font-medium text-center">
            Reportes Generados
          </p>
        </div>
      </div>

     
    </div>
  );
}
