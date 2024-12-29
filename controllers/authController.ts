import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import asyncHandler from "express-async-handler";
import { Request, Response, NextFunction } from "express";
import userModel from "../models/userModel";
import { createToken } from "../utils/createToken";
import { User } from "../interfaces/user";
import ApiError from "../utils/apiError";

//signUp
export const signUp = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const user: User = await userModel.create(req.body);
    const token = createToken(user._id);
    res.status(201).json({ token, data: user });
  }
);

//login
export const login = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const user: User | null = await userModel.findOne({
      email: req.body.email,
    });
    if (!user || !(await bcryptjs.compare(req.body.password, user.password))) {
      return next(new ApiError("Error In Email Or Password", 401));
    }
    const token = createToken(user._id);
    res.status(200).json({ token, message: "login successfully" });
  }
);

//protect routes
export const protectRoute = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    let token: string;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    } else {
      return next(new ApiError("Please Login to access the Route", 401));
    }

    const decode: any = jwt.verify(token, process.env.JWT_SECRET_KEY!);
    const user: User | null = await userModel.findById(decode.userId);
    if (!user) {
      return next(new ApiError("User Not Exist ,please login again", 401));
    }

    if (user.passwordChangedAt instanceof Date) {
      const passwordChangedTime = parseInt(
        (user.passwordChangedAt.getTime() / 1000).toString(),
        10
      );
      if (passwordChangedTime > decode.iat) {
        return next(
          new ApiError("you changed password ,please login again", 401)
        );
      }
    }
    req.user = user;
    next();
  }
);

//allowed to
export const allowedTo = (...roles: string[]) =>
  asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      if (!roles.includes(req.user?.role ?? "")) {
        return next(
          new ApiError("you are not allowed to access this route", 403)
        );
      }
      next();
    }
  );

//check active
export const checkActive = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    if (!req.user?.active) {
      return next(new ApiError("Your Account Not Active", 403));
    }
    next();
  }
);
