import express from "express"
import { getEvents, createEvent, updateEvent, deleteEvent, getEventStats } from "../controllers/eventController"
import { validateEvent } from "../middleware/validation"

const router = express.Router()

router.get("/", getEvents)
router.get("/stats", getEventStats)
router.post("/", validateEvent, createEvent)
router.put("/:id", validateEvent, updateEvent)
router.delete("/:id", deleteEvent)

export default router

