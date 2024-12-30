import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import asyncHandler from "express-async-handler";
import { Request, Response, NextFunction } from "express";
import userModel from "../models/userModel";
import { createResetToken, createToken } from "../utils/createToken";
import { User } from "../interfaces/user";
import ApiError from "../utils/apiError";
import crypto from "crypto";
import sendMail from "../utils/sendMail";
import { Options } from "../interfaces/sendMail";

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

export const forgetPassword = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const user: User | null = await userModel.findOne({
      email: req.body.email,
    });
    if (!user) {
      return next(new ApiError("user not found", 404));
    }

    const resetCode: string = Math.floor(
      100000 + Math.random() * 900000
    ).toString();
    const hashReset = crypto
      .createHash("sha256")
      .update(resetCode)
      .digest("hex");

    user.resetCode = hashReset;
    user.resetCodeExpireAt = Date.now() + 10 * 60 * 1000;
    user.verifyResetCode = false;

    const options: Options = {
      message: resetCode,
      subject: "Reset Code For Change Password",
      email: user.email,
    };
    try {
      await sendMail(options);
    } catch (err) {
      console.log(err);
      user.resetCodeExpireAt = undefined;
      user.verifyResetCode = undefined;
      user.resetCode = undefined;
      return next(new ApiError("Error In Sending Email", 400));
    }

    await user.save({ validateModifiedOnly: true });
    const resetToken = createResetToken(user?._id);
    res
      .status(200)
      .json({ resetToken, message: "Reset Code Send To Your Email" });
  }
);

export const verifyResetCode = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    let Resettoken: string;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      Resettoken = req.headers.authorization.split(" ")[1];
    } else {
      return next(new ApiError("Please Reset Code First", 400));
    }

    const decode: any = jwt.verify(Resettoken, process.env.JWT_SECRET_KEY!);
    const hashReset = crypto
      .createHash("sha256")
      .update(req.body.resetCode)
      .digest("hex");

    const user: User | null = await userModel.findOne({
      _id: decode.userId,
      resetCode: hashReset,
      resetCodeExpireAt: { $gt: Date.now() },
    });

    if (!user) {
      return next(new ApiError("Reset Code Invalid Or Expired", 400));
    }
    user.verifyResetCode = true;
    await user.save({ validateModifiedOnly: true });

    res.status(200).json({ message: "Verify Reset Code Successfully" });
  }
);

export const resetCode = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    let Resettoken: string;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      Resettoken = req.headers.authorization.split(" ")[1];
    } else {
      return next(new ApiError("Please Reset Code First", 400));
    }

    const decode: any = jwt.verify(Resettoken, process.env.JWT_SECRET_KEY!);

    const user: User | null = await userModel.findOne({
      _id: decode.userId,
      verifyResetCode: true,
    });
    if (!user) {
      return next(new ApiError("You Should Verify Reset Code First", 400));
    }

    user.password = req.body.password;
    user.passwordChangedAt = Date.now();
    user.resetCodeExpireAt = undefined;
    user.verifyResetCode = undefined;
    user.resetCode = undefined;

    await user.save({ validateModifiedOnly: true });

    res.status(200).json({ message: "Your Password Changed Successfully" });
  }
);
