
import { useState } from "react";

interface StudentLoginProps {
  handleLogin: (data: { email: string }) => void
}

export default function StudentLogin({ handleLogin }: StudentLoginProps) {
  const [email, setEmail] = useState<string>("")

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()

    handleLogin({
      email: email,
    })
  }
  

  return (
    <main className="min-h-screen flex items-center justify-center bg-teal-50 p-5">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-2 min-h-[550px]">
        {/* Lado izquierdo */}
        <div className="relative hidden md:block">
          <img
            src="/images/estudiantes.jpg"
            alt="Estudiantes preparándose para una evaluación"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-teal-950/50"></div>
          <div className="absolute bottom-10 left-10 right-10 text-white">
            <span className="text-sm uppercase tracking-widest font-semibold text-teal-200">
              Plataforma educativa
            </span>
            <h2 className="text-4xl font-bold mt-2 ">
              Tu conocimiento es el comienzo de nuevas oportunidades.
            </h2>
            <p className="mt-4 text-teal-100 text-sm leading-relaxed">
              Bienvenido a nuestra plataforma de evaluación.
              Prepárate y demuestra lo que has aprendido.
            </p>
          </div>
        </div>


        {/* Lado derecho */}
        <div className="flex flex-col justify-center px-8 py-12 sm:px-12 lg:px-16">
          <div className="max-w-sm w-full mx-auto">
            <div className="mb-10">
              <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.8"
                  stroke="currentColor"
                  className="w-6 h-6 text-teal-700"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75 11.25 15 15 9.75M12 3l8.25 4.5v5.25c0 4.5-3.25 7.5-8.25 9-5-1.5-8.25-4.5-8.25-9V7.5L12 3Z"
                  />
                </svg>
              </div>
              <h1 className="text-3xl font-bold text-slate-800">
                Bienvenido
              </h1>
              <p className="text-slate-500 mt-3 leading-relaxed">
                Ingresa tu correo electrónico para comenzar tu examen de contabilidad.
              </p>

            </div>


            {/* Formulario */}
            <form onSubmit={handleSubmit}>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-slate-700 mb-2"
              >
                Correo electrónico
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="estudiante@correo.com"
                required
                autoComplete="email"
                className="w-full px-4 py-3.5 rounded-xl border border-slate-300 outline-none transition focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-slate-700 placeholder:text-slate-400"
              />
              <button
                type="submit"
                className="w-full mt-6 bg-teal-700 hover:bg-teal-800 text-white font-semibold py-3.5 rounded-xl transition duration-200 shadow-md shadow-teal-700/20 flex items-center justify-center gap-2"
              >
                Entrar al examen
                <span>→</span>
              </button>
            </form>

            <div className="mt-10 pt-6 border-t border-slate-100">
              <p className="text-center text-xs text-slate-400">
                Plataforma de Evaluación Académica por Amairani Romero
              </p>
            </div>

          </div>

        </div>

      </div>

    </main>
  );
}
