const API_URL = "http://localhost:3001/api/grados"; // Cambia según tu backend

export const obtenerGrados = async () => {
  const res = await fetch(`${API_URL}/grados`);
  if (!res.ok) throw new Error("Error al obtener los grados");
  return await res.json();
};

export const crearGrado = async (gradoData) => {
  const res = await fetch(`${API_URL}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(gradoData),
  });
  if (!res.ok) throw new Error("Error al crear grado");
  return await res.json();
};

export const asignarDocenteAGrado = async (gradoId, docenteId) => {
  const res = await fetch(`${API_URL}/grados/${gradoId}/asignar-docente`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id_docente: docenteId }),
  });
  return res.json();
};



export const obtenerGradoPorDocente = async (id_docente) => {
  const response = await fetch(`${API_URL}/${id_docente}`);
  
  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || 'Error al obtener grados del docente');
  }
  
  return await response.json(); // Devuelve array de grados
};

// AQUÍ ESTÁ LA FUNCIÓN QUE TE FALTABA
export const obtenerGradoPorId = async (id_grado) => {
  const response = await fetch(`${API_URL}/grados/${id_grado}`);
  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || "Grado no encontrado");
  }
  return await response.json();
};