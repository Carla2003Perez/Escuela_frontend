const API_URL = '/api/estudiante';

export const crearEstudiante = async (estudianteData) => {
  try {
    const response = await fetch(`${API_URL}/directora`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(estudianteData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error al crear estudiante');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error creando estudiante:', error);
    throw error;
  }
};

export const obtenerEstudiantes = async () => {
  try {
    const response = await fetch(`${API_URL}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error obteniendo estudiantes:', error);
    throw error;
  }
};
