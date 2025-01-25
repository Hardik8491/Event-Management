import type { Request, Response, NextFunction } from "express"
import Event from "../models/Event"
import { io } from "../server"
import logger from "../utils/logger"
import { log } from "winston"
import mongoose from "mongoose"

export const getEvents = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { category, search, startDate, endDate, page = 1, limit = 10 } = req.query
    const query: any = { createdBy: (req as any).user.userId }

    if (category) query.category = category
    if (search) {
      query.$or = [
        { name: new RegExp(search as string, "i") },
        { surname: new RegExp(search as string, "i") },
        { village: new RegExp(search as string, "i") },
      ]
    }
    if (startDate && endDate) {
      query.createdAt = { $gte: new Date(startDate as string), $lte: new Date(endDate as string) }
    }

    const events = await Event.find(query)
      .sort({ createdAt: -1 })
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit))
      .exec()

    const count = await Event.countDocuments(query)

    res.json({
      events,
      totalPages: Math.ceil(count / Number(limit)),
      currentPage: Number(page),
    })
  } catch (error) {
    next(error)
  }
}

export const createEvent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newEvent = new Event({
      ...req.body,
      createdBy: (req as any).user.userId,
    })
    await newEvent.save()
    io.emit("newEvent", newEvent)
    res.status(201).json(newEvent)
  } catch (error) {
    next(error)
  }
}

export const updateEvent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const updatedEvent = await Event.findOneAndUpdate(
      { _id: req.params.id, createdBy: (req as any).user.userId },
      { ...req.body, updatedAt: new Date() },
      { new: true },
    )
    if (!updatedEvent) {
      return res.status(404).json({ message: "Event not found or you do not have permission to update it" })
    }
    io.emit("updateEvent", updatedEvent)
    res.json(updatedEvent)
  } catch (error) {
    next(error)
  }
}

export const deleteEvent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const deletedEvent = await Event.findOneAndDelete({ _id: req.params.id, createdBy: (req as any).user.userId })
    if (!deletedEvent) {
      return res.status(404).json({ message: "Event not found or you do not have permission to delete it" })
    }
    io.emit("deleteEvent", req.params.id)
    res.json({ message: "Event deleted successfully" })
  } catch (error) {
    next(error)
  }
}

export const getEventStats = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Extract and convert the user ID to ObjectId
    const userId = (req as any).user.userId; // Assuming userId is passed in the request
    const objectId = new mongoose.Types.ObjectId(userId); // Convert to ObjectId

    // Perform the aggregation
    const stats = await Event.aggregate([
      { $match: { createdBy: objectId } }, // Match documents created by the user
      {
        $group: {
          _id: "$category", // Group by category
          count: { $sum: 1 }, // Count events per category
          totalAmount: { $sum: "$amount" }, // Sum of amounts per category
        },
      },
    ]);

    // Debugging logs
    console.log("User ID:", userId);
    console.log("Aggregation Results:", stats);

    res.json(stats); // Return the stats in the response
  } catch (error) {
    next(error); // Pass any error to the error-handling middleware
  }
};
