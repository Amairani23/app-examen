
import { getToken } from "./token"
import { BASE_URL } from "./auth"

interface ApiOptions {
  baseUrl: string
}

interface ExamAnswer {
  questionId: string
  selectedAnswer: string | null
}

interface ExamData {
  respuestas: ExamAnswer[]
}

export interface Question {
  _id: string
  statement: string
  options: {
    id: string
    text: string
  }[]
}

export interface ExamResponse {
  _id: string
  title: string
  preguntas: Question[]
}

export interface ExamAttemptResponse {
  alreadyCompleted: boolean
  results: {
    _id: string
    student: string
    exam: string
    respuestas: {
      questionId: string
      selectedAnswer: string | null
      correctAnswer: string
      isCorrect: boolean
    }[]
    correctAnswers: number
    incorrectAnswers: number
    totalQuestions: number
    status: "finished"
    completedAt: string
  } | null
}

export interface SubmitExamResponse {
  message: string
  results: {
    _id: string
    student: string
    exam: string
    respuestas: {
      questionId: string
      selectedAnswer: string | null
      correctAnswer: string
      isCorrect: boolean
    }[]
    correctAnswers: number
    incorrectAnswers: number
    totalQuestions: number
    status: "finished"
    completedAt: string
  }
}

class Api {
  baseUrl: string

  constructor(options: ApiOptions) {
    this.baseUrl = options.baseUrl
  }

  // Headers de autenticación
  _getHeaders(): HeadersInit {
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    }
  }

  // Obtener preguntas del examen
  getExam(): Promise<ExamResponse[]> {
  return fetch(`${this.baseUrl}/exam`, {
    headers: this._getHeaders(),
  }).then(async (res) => {
    if (!res.ok) throw new Error(`Error: ${res.status}`)
    return res.json()
  })
}

  // Comprobar si ya presentó el examen
getComplete(examId: string): Promise<ExamAttemptResponse> {
  return fetch(`${this.baseUrl}/attempts/${examId}`, {
    headers: this._getHeaders(),
  }).then(async (res) => {
    if (!res.ok) {
      throw new Error(`Error: ${res.status}`)
    }

    return res.json()
  })
}

  // Agregar intento de examen
  addExam(
    examData: ExamData,
    examId: string
  ): Promise<SubmitExamResponse> {
    return fetch(`${this.baseUrl}/attempts/${examId}`, {
      method: "POST",
      headers: this._getHeaders(),
      body: JSON.stringify(examData),
    }).then(async (res) => {
      const data = await res.json()

      if (!res.ok) throw data

      return data
    })
  }
}

const api = new Api({
  baseUrl: BASE_URL,
})

export default api
