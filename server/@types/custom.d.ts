import { Request, Response, NextFunction } from "express";
import { IUser } from "../src/models/user.model";
import { Redis } from "ioredis";

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }

}
