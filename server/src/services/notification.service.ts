import { Request, Response, NextFunction } from "express";
import { CatchAsyncError } from "../middleware/catchAsyncError";
import dotenv from "dotenv";
import NotificationModel from "../models/notification.model";

dotenv.config();

// create notification
export const createNotification = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const notification = await NotificationModel.create(req.body);
    res.status(201).json({
      success: true,
      notification,
    });
  }
);
