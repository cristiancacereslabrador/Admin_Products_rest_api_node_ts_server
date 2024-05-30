import { validationResult } from "express-validator";
import { NextFunction, Request, Response } from "express";
import colors from "colors";

export const handleInputErrors = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // console.log(colors.blue.bold("Desde el Middleware..."));
  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
