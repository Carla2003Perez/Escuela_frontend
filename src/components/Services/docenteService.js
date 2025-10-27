const API_URL = "http://localhost:3001/api/docente";

export async function crearDocente(docenteData) {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(docenteData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Error al crear docente");
    }

    return await response.json();
  } catch (error) {
    console.error("Error en crearDocente:", error);
    throw error;
  }
}

export async function obtenerDocentes() {
  const response = await fetch(API_URL);
  return response.json();
}
