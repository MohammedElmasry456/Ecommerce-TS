import { validationResult } from "express-validator";
import { Request, Response, NextFunction, RequestHandler } from "express";

const validatorMiddleware: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ Errors: errors.array() });
    return;
  }
  next();
};

export default validatorMiddleware;
