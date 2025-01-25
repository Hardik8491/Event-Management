import type { Request, Response, NextFunction } from "express";
import Category from "../models/Category";
import { log } from "winston";

export const getCategories = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const categories = await Category.find({
      createdBy: (req as any).user.userId,
    });
    res.json(categories);
  } catch (error) {
    next(error);
  }
};

export const createCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {name} = req.body;
    console.log(req.body,name);


    const newCategory = new Category({
      name:name,
      createdBy: (req as any).user.userId,
    });
    await newCategory.save();
    res.status(201).json(newCategory);
  } catch (error) {
    next(error);
  }
};

export const deleteCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const deletedCategory = await Category.findOneAndDelete({
      _id: req.params.id,
      createdBy: (req as any).user.userId,
    });
    if (!deletedCategory) {
      return res.status(404).json({
        message:
          "Category not found or you do not have permission to delete it",
      });
    }
    res.json({ message: "Category deleted successfully" });
  } catch (error) {
    next(error);
  }
};
