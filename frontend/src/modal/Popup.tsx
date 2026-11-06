
import type { ReactNode } from "react"

interface PopupProps {
  onClose: () => void
  title?: string
  children: ReactNode
}

export default function Popup({ onClose, title, children }: PopupProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div
        className={`relative w-full max-w-lg rounded-2xl bg-teal-100 p-6 shadow-2xl ${
          !title ? "p-0 overflow-hidden" : ""
        }`}
      >
        <button
          aria-label="Close modal"
          className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full text-2xl text-white text-gray-500 transition hover:bg-white-100 hover:text-white-800"
          type="button"
          onClick={onClose}
        >
          &times;
        </button>

        {title && (
          <h3 className="mb-4 pr-8 text-2xl font-semibold text-white">
            {title}
          </h3>
        )}

        {children}
      </div>
    </div>
  )
}
