const API_URL = "http://localhost:3001/api/estudiante";

export const crearEstudiante = async (datos) => {
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
      throw new Error(errorData.message || "Error al crear estudiante");
    }

    return await response.json();
  } catch (error) {
    console.error("Error al crear estudiante:", error);
    throw error;
  }
};


export async function obtenerEstudiantes() {
  const response = await fetch(API_URL);
  return response.json();
}
