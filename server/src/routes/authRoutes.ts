import express from "express"
import { register, login, logout, checkAuthStatus } from "../controllers/authController"
import { validateUser } from "../middleware/validation"
import { authenticateToken } from "../middleware/auth"

const router = express.Router()

router.post("/register", validateUser, register)
router.post("/login", validateUser, login)
router.post("/logout", logout)
router.get("/status", authenticateToken, checkAuthStatus)

export default router

