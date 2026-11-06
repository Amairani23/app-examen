
import express from "express";

import {
  checkExamAttempt,
  submitExam,
} from "../controllers/attemptControllers.js";


const router = express.Router();

// Consultar si el estudiante ya presentó el examen
router.get("/attempts/:examId", checkExamAttempt);

// Entregar y calificar el examen
router.post("/attempts/:examId", submitExam);

export default router;
