
const TOKEN_KEY = "jwt"

// Guardar token
export const setToken = (token: string): void => {
  localStorage.setItem(TOKEN_KEY, token)
}

// Obtener token
export const getToken = (): string | null => {
  return localStorage.getItem(TOKEN_KEY)
}

// Eliminar token
export const removeToken = (): void => {
  localStorage.removeItem(TOKEN_KEY)
}
