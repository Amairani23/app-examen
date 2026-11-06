

export const BASE_URL =  import.meta.env.VITE_API_URL;

export interface LoginResponse {
  message: string
  token: string
  email: string
}

export interface User {
  _id: string
  email: string
  [key: string]: unknown
}

// Inicio de sesión
export const authorize = (email: string): Promise<LoginResponse> => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
    }),
  }).then(async (res) => {
    if (res.ok) {
      return (await res.json()) as LoginResponse
    }

    return Promise.reject(
      res.status === 400
        ? "No se ha proporcionado uno o más campos."
        : res.status === 401
          ? "No se ha encontrado al usuario con el correo electrónico especificado."
          : "Error en la solicitud."
    )
  })
}

// Verificar token y obtener información del usuario
export const checkToken = (token: string): Promise<User> => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then(async (res) => {
    if (res.ok) {
      return (await res.json()) as User
    }

    if (res.status === 400) {
      return Promise.reject(
        "400 - Token no proporcionado o proporcionado en el formato incorrecto."
      )
    }

    if (res.status === 401) {
      return Promise.reject(
        "401 - El token proporcionado es inválido."
      )
    }

    return Promise.reject(`Error: ${res.status}`)
  })
}
