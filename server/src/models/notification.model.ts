import mongoose, { Document, Model, Schema } from "mongoose";
import { Express } from "express";
import dotenv from "dotenv";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { IUser } from "./user.model";
import { timeStamp } from "console";

export interface INotification extends Document {
  title: string;
  status: string;
  userId: string;
  message: string;
}
const notificationSchema = new Schema<INotification>(
  {
    title: {
      type: String,
      require: true,
    },
    message: {
      type: String,
      require: true,
    },
    status: {
      type: String,
      require: true,
      default: "unread",
    },
  },
  {
    timestamps: true,
  }
);

const NotificationModel:Model<INotification> = mongoose.model("Notification", notificationSchema);
export default NotificationModel;