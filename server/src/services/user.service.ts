// get user by id

import userModel from "../models/user.model";
import { response, Response } from "express";
import redisClient from "../utils/redis";
import ErrorHandler from "../utils/ErrorHandler";

export const getUserById = async (id: string, res: Response) => {
  const userJson = await redisClient.get(id);

  if (userJson) {
    const user = JSON.parse(userJson as string);
    return res.status(200).json({ success: true, user });
  } else {
  }
};

// get all user
export const getAllUserService = async (res: Response) => {
  const user = await userModel.find().sort({ createAt: -1 });
  res.status(201).json({
    success: true,
    user,
  });
};

export const updateUserRoleService = async (res: Response,id: string,role: string ) => {
try {
   
    const user = await userModel.findByIdAndUpdate(id, { role }, { new: true });

    res.status(201).json({
      success: true,
      user,
    });
} catch (error:any) {
return res.status(401).json({
    success:false,
    message:error
})
    
}
};
