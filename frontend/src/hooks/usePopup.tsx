
import { useState, type ReactNode } from "react"

interface Popup {
  title: string
  children: ReactNode
}

export const usePopup = () => {
  const [popup, setPopup] = useState<Popup | null>(null)

  function handleOpenPopup(popup: Popup): void {
    setPopup(popup)
  }

  function handleClosePopup(): void {
    setPopup(null)
  }

  return {
    popup,
    handleOpenPopup,
    handleClosePopup,
  }
}
