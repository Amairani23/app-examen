import express from "express"

import { getCurrentUser } from "../controllers/usersControllers.js"

const router = express.Router()

// Mostrar usuario
router.get("/users/me", getCurrentUser)

export default router
