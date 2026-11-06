
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import * as auth from "../utils/auth"
import { setToken, getToken, removeToken } from "../utils/token"
import InfoTooltip from "../modal/InfoTooltip"

interface User {
  _id: string
  email: string
}

interface LoginResponse {
  token: string
  email: string
}

interface PopupProps {
  title: string
  children: React.ReactNode
}

type HandleOpenPopup = (props: PopupProps) => void
type HandleClosePopup = () => void

export const useLogin = (
  handleOpenPopup: HandleOpenPopup,
  handleClosePopup: HandleClosePopup
) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)

  const navigate = useNavigate()

  const handleLogin = ({ email }: { email: string }) => {
    handleClosePopup()

    if (!email) return

    auth
      .authorize(email)
      .then((data: LoginResponse) => {
        if (data.token) {
          setToken(data.token)
          setIsLoggedIn(true)
          navigate("/examen")
        }
      })
      .catch((err: unknown) => {
        console.log("Error", err)

        handleOpenPopup({
          title: "",
          children: <InfoTooltip isSuccess={false} />,
        })
      })
  }

  const handleLogout = () => {
    removeToken()
    setIsLoggedIn(false)
    setUser(null)
    navigate("/")
  }

  useEffect(() => {
    const jwt = getToken()

    if (!jwt) return

    auth
      .checkToken(jwt)
      .then((data: User) => {
        setIsLoggedIn(true)
        setUser(data)
      })
      .catch((err: unknown) => {
        console.log(err)
        removeToken()
        setIsLoggedIn(false)
        setUser(null)
      })
  }, [])

  return {
    user,
    isLoggedIn,
    handleLogin,
    handleLogout,
  }
}
