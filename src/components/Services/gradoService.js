//gradoService.js
const API_URL = "http://localhost:3001/api/grados"; // Cambia según tu backend

export const obtenerGrados = async () => {
  const res = await fetch(`${API_URL}`);
  if (!res.ok) throw new Error("Error al obtener los grados");
  return await res.json();
};

// CREAR GRADO
export const crearGrado = async (gradoData) => {
  const res = await fetch(`${API_URL}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(gradoData),
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Error al crear grado");
  }
  return await res.json();
};

export const asignarDocenteAGrado = async (gradoId, docenteId) => {
  const res = await fetch(`${API_URL}/${gradoId}/asignar-docente`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id_docente: docenteId }),
  });
  if (!res.ok) throw new Error("Error al asignar docente");
  return res.json();
};



//obtener grado para el maestro
export const obtenerGradoPorDocente = async (id_docente) => {
  const response = await fetch(`${API_URL}/docente/${id_docente}`);
  
  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || 'Error al obtener grados del docente');
  }
  
  return await response.json(); // Devuelve array de grados
};


export const obtenerGradoPorId = async (id_grado) => {
  const response = await fetch(`${API_URL}/${id_grado}`);
  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || "Grado no encontrado");
  }
  return await response.json();
};

export const obtenerGradosAsignados = async (id_docente) => {
  console.log("Buscando grados para docente:", id_docente);
  const response = await fetch(`${API_URL}/asignados/docente/${id_docente}`);
  console.log("➡️ Respuesta del servidor:", response);
  const data = await response.json();
  console.log("📦 Grados recibidos:", data);
  
  if (!response.ok) throw new Error("Error al cargar grados");
  return data;
};