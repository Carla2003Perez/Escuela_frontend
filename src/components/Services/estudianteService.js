const API_URL = "http://localhost:3001/api/estudiante";

export async function crearEstudiante(estudianteData) {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(estudianteData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Error al crear estudiante");
    }

    return await response.json();
  } catch (error) {
    console.error("Error en crearEstudiante:", error);
    throw error;
  }
}

export async function obtenerEstudiantes() {
  const response = await fetch(API_URL);
  return response.json();
}
