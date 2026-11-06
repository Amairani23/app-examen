import Exam from "../models/exam.js"

// Crear examen completo
const createExam = async (req, res, next) => {
  try {
    console.log("Datos recibidos:", req.body)
    
    const { title, preguntas } = req.body


    const newExam = new Exam({
      title,
      preguntas,
    })

    await newExam.save()

    return res.status(201).json({
      message: "Examen creado correctamente",
      exam: newExam,
    })
  } catch (error) {
    return next(error)
  }
}

// Mostrar exámenes sin respuestas correctas
const showExam = async (req, res, next) => {
  try {
    const exams = await Exam.find({}).select("-preguntas.correctAnswer")

    return res.status(200).json(exams)
  } catch (error) {
    return next(error)
  }
}

// Mostrar un examen específico
const getExamById = async (req, res, next) => {
  try {
    const exam = await Exam.findById(req.params.examId).select(
      "-preguntas.correctAnswer",
    )

    if (!exam) {
      return res.status(404).json({
        message: "Examen no encontrado",
      })
    }

    return res.status(200).json(exam)
  } catch (error) {
    return next(error)
  }
}

export { createExam, showExam, getExamById }
