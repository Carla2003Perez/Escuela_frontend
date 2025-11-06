//docenteService.js
const API_URL = "http://localhost:3001/api/docente";

export const crearDocente = async (datos) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datos),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error al crear docente");
    }

    return await response.json();
  } catch (error) {
    console.error("Error al crear docente:", error);
    throw error;
  }
};

export async function obtenerDocentes() {
  const response = await fetch(API_URL);
  return response.json();
}

export const obtenerTotalDocentes = async () => {
  const res = await fetch(`${API_URL}/total`);
  if (!res.ok) throw new Error("Error al obtener total de docentes");
  return await res.json(); // { total: X }
};
