import express from "express"

import usersRouter from "./usersRouter.js"
import examRouter from "./examRouter.js"
import attemptRouter from "./attemptRouter.js"

const router = express.Router()

router.use("/", usersRouter)
router.use("/", examRouter)
router.use("/", attemptRouter)

export default router
