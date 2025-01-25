import type { Request, Response, NextFunction } from "express";
import Joi from "joi";

const eventSchema = Joi.object({
  surname: Joi.string().required(),
  name: Joi.string().required(),
  fatherName: Joi.string().required(),
  village: Joi.string().required(),
  amount: Joi.number().required(),
  category: Joi.string().required(),
});

const userSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required().min(6),
});

const categorySchema = Joi.object({
  name: Joi.string().required(),
});

export const validateEvent = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = eventSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};

export const validateUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = userSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};

export const validateCategory = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = categorySchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};
