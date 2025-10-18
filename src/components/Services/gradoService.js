const API_URL = "http://localhost:3001/api"; // Cambia según tu backend

export const obtenerGrados = async () => {
  const res = await fetch(`${API_URL}/grados`);
  if (!res.ok) throw new Error("Error al obtener los grados");
  return await res.json();
};

export const crearGrado = async (gradoData) => {
  const res = await fetch(`${API_URL}/grados`, {
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