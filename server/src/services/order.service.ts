import { Request, Response, NextFunction } from "express";
import { CatchAsyncError } from "../middleware/catchAsyncError";
import dotenv from "dotenv";

import OrderModel from "../models/order.model";
import ErrorHandler from "../utils/ErrorHandler";

dotenv.config();

// create order
export const newOrder = 
    async (session:any,data: any, res: Response, next: NextFunction) => {
      try {
        const order = await OrderModel.create(data);
        res.status(201).json({
            success: true,
            order,
            url:session.url
            
        });
      } catch (error) {
        return res.status(401).json({
            success:false,
            message:error
        })
      }
    }


// get all order
export const getAllOrderService = async (res: Response) => {
    const orders = await OrderModel.find().sort({ createAt: -1 });
    res.status(201).json({
        success: true,
        orders,
    });
};
