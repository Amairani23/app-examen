
import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  statement: {
    type: String,
    required: true,
  },

  options: [
    {
      id: {
        type: String,
        required: true,
      },
      text: {
        type: String,
        required: true,
      },
    },
  ],

  correctAnswer: {
    type: String,
    required: true,
  },
});

const examSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    default: "Examen Contabilidad",
  },

  preguntas: {
    type: [questionSchema],
    required: true,
  },
});

const Exam = mongoose.model("Exam", examSchema);

export default Exam;
