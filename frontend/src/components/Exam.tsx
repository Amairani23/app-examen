import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api, { type ExamResponse } from "../utils/api";
import InfoIncomplete from "../modal/InfoIncomplete";

type ModalProps = {
  handleOpenPopup: (props: {
    title: string;
    children: React.ReactNode;
  }) => void;
  onClose: ()=>void
};

interface Question {
  _id: string;
  statement: string;
  options: {
    id: string;
    text: string;
  }[];
}

export default function Exam({ handleOpenPopup, onClose }: ModalProps) {
  const [preguntas, setPreguntas] = useState<Question[]>([]);
  const [respuestas, setRespuestas] = useState<Record<string, string>>({});
  const [examId, setExamId] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const answeredCount = Object.keys(respuestas).length;

  // Cargar preguntas desde MongoDB
  useEffect(() => {
    const loadExam = async () => {
      try {
        const data: ExamResponse[] = await api.getExam();

        if (data.length === 0) {
          throw new Error("No hay exámenes registrados");
        }

        const exam = data[0];

        setExamId(exam._id);
        setPreguntas(exam.preguntas);
      } catch (error) {
        console.error("Error al cargar examen:", error);
        setErrorMessage("No se pudo cargar el examen.");
      } finally {
        setLoading(false);
      }
    };

    loadExam();
  }, [examId]);

  // Comprobar si ya presentó el examen
  useEffect(() => {
   if (!examId || preguntas.length === 0) return;

    const checkAttempt = async () => {
      try {
        const data = await api.getComplete(examId);

        if (data?.results?.respuestas) {
        navigate("/retroalimentacion", {
          state: {
            results: data.results,
            question: preguntas,
          },
        });
      }
      } catch (error) {
        console.error("Error al comprobar intento:", error);
        setErrorMessage("No se pudo comprobar tu intento.");
      }
    };

    checkAttempt();
  }, [examId]);

  // Seleccionar respuesta
  const handleAnswer = (questionId: string, optionId: string) => {
    if (submitted || sending) return;

    setRespuestas((prev) => ({
      ...prev,
      [questionId]: optionId,
    }));
  };

  // Enviar examen
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (answeredCount !== preguntas.length) {
      handleOpenPopup({
        title: "",
        children: <InfoIncomplete onClose={onClose} />,
      });
      return;
    }

    if (sending || submitted) return;

    setSending(true);
    setErrorMessage("");

    try {
      const examData = {
        respuestas: preguntas.map((question) => ({
          questionId: question._id,
          selectedAnswer: respuestas[question._id] ?? null,
        })),
      };

      const response = await api.addExam(examData, examId);

      setSubmitted(true);

      navigate("/retroalimentacion", {
        state: {
          results: response.results,
          question: preguntas,
        },
      });
    } catch (error) {
      console.error("Error al enviar examen:", error);
      setErrorMessage("No se pudo guardar el examen.");
    } finally {
      setSending(false);
    }
  };

  // Mostrar carga
  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-teal-50">
        <p>Verificando examen...</p>
      </main>
    );
  }

  // Mostrar error
  if (errorMessage && preguntas.length === 0) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-red-600">{errorMessage}</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-teal-50 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8">
          <div className="flex items-center gap-3 mb-5 text-center">
            <div>
              <h1 className="text-2xl font-bold text-teal-800 mb-4">
                <span className="text-2xl">📚</span> EXAMEN DE CONTABILIDAD
              </h1>
              <p className="text-xl">
                La Comercializadora Central registra las siguientes operaciones
                durante su primer mes. Para cada una, ¿cómo se registra en la
                cuenta Bancos?
              </p>
            </div>
          </div>
        </header>
        <div className="bg-teal-100 border border-teal-100 rounded-xl p-4 mb-6">
          <p className="text-sm text-teal-800 leading-relaxed">
            Lee cuidadosamente cada pregunta y selecciona una sola respuesta. Al
            terminar, presiona el botón para enviar tu evaluación.
          </p>
        </div>

        {/* Preguntas */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {preguntas.map((question, index) => (
            <section
              key={question._id}
              className="bg-white rounded-2xl shadow-sm border border-teal-200 p-6 sm:p-8"
            >
              <div className="flex items-start gap-4 mb-6">
                <div className="w-10 h-10 shrink-0 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center font-bold">
                  {index + 1}
                </div>
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-teal-600">
                    Pregunta {index + 1}
                  </span>
                  <h2 className="text-lg font-semibold text-slate-800 mt-1">
                    {question.statement}
                  </h2>
                </div>
              </div>

              {/* Opciones den la pregunta */}
              <div className="space-y-3">
                {question.options.map((option) => {
                  const selected = respuestas[question._id] === option.id;
                  return (
                    <label
                      key={option.id}
                      className={`
                        flex items-center gap-4 p-4 rounded-xl border
                        cursor-pointer transition-all duration-200
                        ${
                          selected
                            ? "border-teal-500 bg-teal-50 ring-1 ring-teal-500"
                            : "border-slate-200 hover:border-teal-300 hover:bg-slate-50"
                        }
                        ${submitted ? "cursor-not-allowed opacity-80" : ""}
                      `}
                    >
                      <input
                        type="radio"
                        name={`question-${question._id}`}
                        value={option.id}
                        checked={selected}
                        onChange={() => handleAnswer(question._id, option.id)}
                        disabled={submitted || sending}
                        
                      />

                      <span
                        className={`
                          flex-1 text-sm sm:text-base
                          ${selected ? "text-teal-800 font-medium" : "text-slate-700"}
                        `}
                      >
                        <span className="font-semibold mr-2">
                          {option.id.toUpperCase()}.
                        </span>

                        {option.text}
                      </span>
                    </label>
                  );
                })}
              </div>
            </section>
          ))}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-5">
              <div>
                <p className="font-semibold text-slate-800">
                  {submitted
                    ? "Evaluación enviada"
                    : "¿Terminaste tu evaluación?"}
                </p>

                <p className="text-sm text-slate-500 mt-1">
                  {submitted
                    ? "Tus respuestas han sido registradas."
                    : `Has respondido ${answeredCount} de 5 preguntas.`}
                </p>
              </div>

              <button
                type="submit"
                disabled={submitted || sending}
                className="w-full sm:w-auto px-8 py-3.5 bg-teal-700 hover:bg-teal-800 disabled:bg-slate-400 text-white font-semibold rounded-xl transition"
              >
                {sending
                  ? "Guardando examen..."
                  : submitted
                    ? "Examen enviado ✓"
                    : "Finalizar examen →"}
              </button>
            </div>
          </div>
        </form>

        <footer className="text-center mt-8 text-xs text-slate-400">
          Plataforma de Evaluación Académica por Amairani Romero
        </footer>
      </div>
    </main>
  );
}
