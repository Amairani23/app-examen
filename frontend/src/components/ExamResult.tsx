import { useLocation, useNavigate } from "react-router-dom";

interface ExamResultItem {
  questionId: string;
  statement: string;
  options: {
    id: string;
    text: string;
  }[];
  selectedAnswer: string | null;
  correctAnswer: string;
  isCorrect: boolean;
}

interface ExamAttempt {
  _id: string;
  respuestas: ExamResultItem[];
  correctAnswers: number;
  incorrectAnswers: number;
  totalQuestions: number;
  status: string;
}

interface Question {
  _id: string;
  statement: string;
  options: {
    id: string;
    text: string;
  }[];
}

interface FeedbackState {
  results: ExamAttempt;
  question: Question[];
}

type ModalProps = {
  handleLogout: () => void;
};

export default function ExamResult({ handleLogout }: ModalProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const state = location.state as FeedbackState | null;

  // Evitar acceso sin resultados
  if (!state) {
    return (
      <main className="min-h-screen bg-teal-50 flex items-center justify-center p-5">
        <div className="bg-white p-8 rounded-2xl shadow-sm text-center">
          <h1 className="text-xl font-bold text-slate-800">
            No hay resultados disponibles
          </h1>

          <button
            onClick={() => navigate("/examen")}
            className="mt-5 bg-teal-700 text-white px-6 py-3 rounded-xl"
          >
            Ir al examen
          </button>
        </div>
      </main>
    );
  }

  const { results, question } = state;
  const correctAnswers = results.correctAnswers;
  const incorrectAnswers = results.incorrectAnswers;
  const totalQuestions = results.totalQuestions;

  return (
    <main className="min-h-screen bg-teal-50 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 mb-6 text-center">
          <div className="text-5xl mb-4">
            {correctAnswers >= 3 ? "🎉" : "📝"}
          </div>
          <h1 className="text-3xl font-bold text-slate-800">
            Retroalimentación del examen
          </h1>
          <p className="text-slate-500 mt-3">
            Revisa tus respuestas y conoce tu resultado.
          </p>

          {/* Recuadro de calificación */}
          <div className="mt-8 inline-flex flex-col items-center bg-blue-50 border border-blue-100 rounded-2xl px-12 py-6">
            <span className="text-sm font-semibold text-blue-700">
              Calificación final
            </span>
            <span className="text-6xl font-bold text-blue-800 mt-2">
              {correctAnswers}/{totalQuestions}
            </span>
            <span className="text-sm text-blue-600 mt-2">
              {correctAnswers} aciertos
            </span>
          </div>

          {/* Recuadro de las respuestas / incorrectas */}
          <div className="grid grid-cols-2 gap-4 mt-8">
            <div className="bg-green-50 border border-green-200 rounded-xl p-4">
              <p className="text-3xl font-bold text-green-700">
                {correctAnswers}
              </p>
              <p className="text-sm text-green-700 mt-1">
                Respuestas correctas
              </p>
            </div>
            <div className="bg-red-50 border border-red-200 rounded-xl p-4">
              <p className="text-3xl font-bold text-red-700">
                {incorrectAnswers}
              </p>
              <p className="text-sm text-red-700 mt-1">
                Respuestas incorrectas
              </p>
            </div>
          </div>
        </div>

        {/* Detalle de las respuestas */}
        <div className="space-y-6">
          {results.respuestas.map((questionR, index) => {
            const selectedAnswer = questionR.selectedAnswer;
            const isCorrect = questionR.isCorrect;

            const questionP = question.find(
              (q) => q._id === questionR.questionId,
            );
            
            if (!questionP) return null;

            return (
              <section
                key={questionP._id}
                className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8"
              >
                {/* Título de la pregunta */}
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-10 h-10 shrink-0 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-teal-600">
                      Pregunta {index + 1}
                    </span>
                    <h2 className="text-lg font-semibold text-slate-800 mt-1">
                      {questionP.statement}
                    </h2>
                  </div>
                </div>

                {/* Muestra opciones del examen */}
                <div className="space-y-3">
                  {questionP.options.map((option) => {
                    const selected = selectedAnswer === option.id;
                    const isCorrectOption =
                      option.id === questionR.correctAnswer;

                    let style = "border-slate-200 bg-white";

                    if (isCorrectOption) {
                      style = "border-green-500 bg-green-50";
                    } else if (selected && !isCorrect) {
                      style = "border-red-500 bg-red-50";
                    }

                    return (
                      <div
                        key={option.id}
                        className={`flex items-center gap-4 p-4 rounded-xl border ${style}`}
                      >
                        <span className="flex-1 text-sm sm:text-base text-slate-700">
                          <strong className="mr-2">
                            {option.id.toUpperCase()}.
                          </strong>

                          {option.text}
                        </span>

                        {isCorrectOption && (
                          <span className="text-green-700 text-sm font-bold">
                            ✓ Correcta
                          </span>
                        )}

                        {selected && !isCorrect && (
                          <span className="text-red-700 text-sm font-bold">
                            ✕ Tu respuesta
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Caja para muestra de puntos */}
                <div
                  className={`mt-5 p-4 rounded-xl border ${
                    isCorrect
                      ? "bg-green-50 border-green-200"
                      : "bg-red-50 border-red-200"
                  }`}
                >
                  <p
                    className={`font-semibold text-sm ${
                      isCorrect ? "text-green-800" : "text-red-800"
                    }`}
                  >
                    {isCorrect
                      ? "¡Excelente! Tu respuesta es correcta. +1 punto"
                      : "Tu respuesta es incorrecta. +0 puntos"}
                  </p>

                  {!isCorrect && (
                    <p className="text-sm text-slate-700 mt-2">
                      La respuesta correcta es:{" "}
                      <strong>{questionR.correctAnswer.toUpperCase()}.</strong>
                    </p>
                  )}
                </div>
              </section>
            );
          })}
        </div>

        {/* Botón salir */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 mt-6 text-center">
          <p className="text-sm text-slate-500 mb-4">
            Has concluido la revisión de tu evaluación.
          </p>
          <button
            onClick={() => handleLogout()}
            className="bg-teal-700 hover:bg-teal-800 text-white font-semibold px-8 py-3.5 rounded-xl transition"
          >
            Salir de la evaluación
          </button>
        </div>
      </div>
    </main>
  );
}
