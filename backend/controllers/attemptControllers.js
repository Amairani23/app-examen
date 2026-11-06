import mongoose from "mongoose"
import Exam from "../models/exam.js"
import ExamAttempt from "../models/examAttempt.js"

// Consultar si ya realizó el examen
const checkExamAttempt = async (req, res, next) => {
  try {
    const studentId = req.user?._id
    const { examId } = req.params

    if (!studentId) {
      return res.status(401).json({
        message: "Usuario no autenticado",
      })
    }

    const attempt = await ExamAttempt.findOne({
      student: studentId,
      exam: examId,
    })

    return res.status(200).json({
      alreadyCompleted: Boolean(attempt),
      results: attempt || null,
    })
  } catch (error) {
    return next(error)
  }
}

// Entregar y calificar examen
const submitExam = async (req, res, next) => {
  try {
    const studentId = req.user?._id
    const { examId } = req.params
    const { respuestas } = req.body

    if (!studentId) {
      return res.status(401).json({
        message: "Usuario no autenticado",
      })
    }

    if (!mongoose.isValidObjectId(examId)) {
      return res.status(400).json({
        message: "ID de examen inválido",
      })
    }

    if (!Array.isArray(respuestas)) {
      return res.status(400).json({
        message: "Las respuestas deben ser un arreglo",
      })
    }

    const exam = await Exam.findById(examId)

    if (!exam) {
      return res.status(404).json({
        message: "Examen no encontrado",
      })
    }

    // Comprobar si ya realizó el examen
    const existingAttempt = await ExamAttempt.findOne({
      student: studentId,
      exam: examId,
    })

    if (existingAttempt) {
      return res.status(409).json({
        message: "Ya realizaste este examen",
        results: existingAttempt,
      })
    }

    // Calificar preguntas en el backend
const results = exam.preguntas.map((question) => {
  const answer = respuestas.find(
    (item) => String(item.questionId) === String(question._id),
  )

  const selectedAnswer = answer?.selectedAnswer ?? null

  const isCorrect =
    selectedAnswer !== null &&
    selectedAnswer === question.correctAnswer

  return {
    questionId: question._id,
    statement: question.statement,
    options: question.options,
    selectedAnswer,
    correctAnswer: question.correctAnswer,
    isCorrect,
  }
})

const correctAnswers = results.filter(
  (result) => result.isCorrect,
).length

const incorrectAnswers = results.length - correctAnswers

    // Guardar intento
    const attempt = new ExamAttempt({
      student: studentId,
      exam: examId,
      respuestas: results,
      correctAnswers,
      incorrectAnswers,
      totalQuestions: results.length,
      status: "finished",
    })

    await attempt.save()

    return res.status(201).json({
      message: "Examen enviado correctamente",
      results: attempt,
    })
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        message: "Ya realizaste este examen",
      })
    }

    return next(error)
  }
}

export { checkExamAttempt, submitExam }
