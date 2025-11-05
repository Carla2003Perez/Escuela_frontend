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



export async function inactivarEstudiante(id) {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Error al inactivar estudiante");
  return res.text();
}
  

export const obtenerTotalEstudiantes = async () => {
  const res = await fetch(`${API_URL}/total`);
  if (!res.ok) throw new Error("Error al obtener total de estudiantes");
  return await res.json(); // { total: 5 }
};

export async function obtenerEstudiantes() {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_URL}/lista`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error("Error al obtener estudiantes");
  return res.json();
}
