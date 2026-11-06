
interface ModalProps {
    onClose: ()=> void
}


export default function InfoIncomplete({onClose}: ModalProps) {
  return (
     <div className="flex flex-col items-center justify-center rounded-xl p-8 text-center">
            <div className="flex flex-col items-center text-center">
              <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-amber-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-9 w-9 text-amber-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v3m0 4h.01M10.3 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.7 3.86a2 2 0 0 0-3.4 0Z"
                  />
                </svg>
              </div>

              <h3 className="text-2xl font-bold text-slate-800">¡Atención!</h3>

              <p className="mt-2 text-sm text-slate-500">
                Aún no puedes finalizar tu evaluación.
              </p>

              {/* Mensaje */}
              <div className="mt-6 w-full rounded-xl border border-amber-200 bg-amber-50 p-4">
                <p className="text-sm leading-relaxed text-amber-800">
                  Por favor, responde todas las preguntas antes de enviar tu
                  examen.
                </p>
              </div>

              {/* Botón */}
              <button
                type="button"
                onClick={onClose}
                className="mt-6 w-full rounded-xl bg-teal-700 px-6 py-3 font-semibold text-white shadow-sm transition hover:bg-teal-800 active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-teal-200"
              >
                Entendido
              </button>
            </div>
     </div>
  )
}
