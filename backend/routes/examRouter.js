import express from "express"

import { createExam, showExam } from "../controllers/examControllers.js"

const router = express.Router()

// Crear examen
router.post("/exam", createExam)

// Muestra examen
router.get("/exam", showExam)

export default router
