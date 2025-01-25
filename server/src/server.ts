import express from "express"
import { createServer } from "http"
import { Server } from "socket.io"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
import logger from "./utils/logger"
import { errorHandler } from "./middleware/errorHandler"
import eventRoutes from "./routes/eventRoutes"
import categoryRoutes from "./routes/categoryRoutes"
import authRoutes from "./routes/authRoutes"
import { authenticateToken } from "./middleware/auth"
import cookieParser from "cookie-parser"

dotenv.config()

const app = express()
const httpServer = createServer(app)

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  }),
)

app.use(express.json())
app.use(cookieParser())

mongoose
  .connect(process.env.MONGODB_URI as string)
  .then(() => logger.info("Connected to MongoDB"))
  .catch((error) => logger.error("MongoDB connection error:", error))

app.use("/api/auth", authRoutes)
app.use("/api/events", authenticateToken, eventRoutes)
app.use("/api/categories", authenticateToken, categoryRoutes)

app.use(errorHandler)

const PORT = process.env.PORT || 5000
const io = new Server(httpServer, {
  cors: {
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  },
})

httpServer.listen(PORT, () => logger.info(`Server running on port ${PORT}`))

export { io }

