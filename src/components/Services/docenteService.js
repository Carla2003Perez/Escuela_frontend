const API_URL = 'http://localhost:3001/api/docente';

export const crearDocente = async (docenteData) => {
  try {
    const response = await fetch(`${API_URL}/directora`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(docenteData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error al crear docente');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error creando docente:', error);
    throw error;
  }
};

export const obtenerDocentes = async () => {
  try {
    const response = await fetch(`${API_URL}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error obteniendo docentes:', error);
    throw error;
  }
};
