// docenteService.js
const API_URL = "http://localhost:3001/api/docente";

export const crearDocente = async (datos) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
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

// OBTENER DOCENTES → CON PROTECCIÓN
export const obtenerDocentes = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error("Error al obtener docentes");
    }
    const data = await response.json();

    // PROTECCIÓN: siempre devolver array
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Error al obtener docentes:", error);
    return [];
  }
};

export const obtenerTotalDocentes = async () => {
  try {
    const res = await fetch(`${API_URL}/total`);
    if (!res.ok) throw new Error("Error al obtener total de docentes");
    return await res.json();
  } catch (error) {
    console.error("Error al obtener total:", error);
    return { total: 0 };
  }
};