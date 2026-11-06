import mongoose from "mongoose"

const examAttemptSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  exam: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Exam",
    required: true,
  },

  respuestas: [
  {
    questionId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    statement: String,
    options: [
      {
        id: String,
        text: String,
      },
    ],
    selectedAnswer: String,
    correctAnswer: String,
    isCorrect: Boolean,
  },
],

  correctAnswers: {
    type: Number,
    required: true,
  },

  incorrectAnswers: {
    type: Number,
    required: true,
  },

  totalQuestions: {
    type: Number,
    required: true,
  },

  status: {
    type: String,
    enum: ["finished"],
    default: "finished",
  },

  completedAt: {
    type: Date,
    default: Date.now,
  },
})

// Un estudiante solo puede realizar un intento por examen.
examAttemptSchema.index({ student: 1, exam: 1 }, { unique: true })

const ExamAttempt = mongoose.model("ExamAttempt", examAttemptSchema)

export default ExamAttempt
