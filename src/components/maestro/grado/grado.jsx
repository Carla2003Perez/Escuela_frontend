import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { obtenerGradoPorId } from "../../Services/gradoService";

export default function Grado() {
  const { id_grado } = useParams();
  const [grado, setGrado] = useState(null);

  useEffect(() => {
    obtenerGradoPorId(id_grado).then(setGrado);
  }, [id_grado]);

  if (!grado) return <p>Cargando grado...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold text-teal-800 mb-4">
        {grado.nombre_grado}
      </h1>
      <p className="text-gray-700">Docente asignado: {grado.docente?.nombre_docente}</p>
      <p className="text-gray-700 mt-2">Estudiantes: {grado.estudiantes?.length || 0}</p>
    </div>
  );
}
