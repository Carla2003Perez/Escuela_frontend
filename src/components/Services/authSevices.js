// src/services/authService.js
const API_ROOT = "http://localhost:3001";

export async function loginUsuario(correo, contrasena) {
  const res = await fetch(`${API_ROOT}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ correo, contrasena }),
  });

  if (!res.ok) throw new Error("Login fallido");

  return await res.json();
}
