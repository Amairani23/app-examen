
import { Navigate } from "react-router-dom"
import type { ReactNode } from "react"

interface ProtectedRouteProps {
  isLoggedIn: boolean
  children: ReactNode
}

function ProtectedRoute({
  isLoggedIn,
  children,
}: ProtectedRouteProps) {

  if (!isLoggedIn) {
    return <Navigate to="/" replace />
  }


  // Si es estudiante, muestra el contenido protegido
  return children
}

export default ProtectedRoute
