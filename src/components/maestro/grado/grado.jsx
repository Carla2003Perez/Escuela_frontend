// src/components/maestro/grado/grado.jsx
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { obtenerGradoPorId } from "../../Services/gradoService";

export default function Grado() {
  const { id } = useParams();
  const [grado, setGrado] = useState(null);

  useEffect(() => {
    obtenerGradoPorId(id).then(setGrado);
  }, [id]);

  if (!grado) return <p className="text-gray-500">Cargando grado...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold text-teal-800 mb-4">
        {grado.nombre_grado}
      </h1>
      <p className="text-gray-700">
        Docente asignado: {grado.docente?.nombre_docente || "Sin asignar"}
      </p>
      <p className="text-gray-700 mt-2">
        Estudiantes: {grado.estudiantes?.length || 0}
      </p>
    </div>
  );
}
