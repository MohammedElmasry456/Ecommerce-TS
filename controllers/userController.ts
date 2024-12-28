import asyncHandler from "express-async-handler";
import { Request, Response, NextFunction } from "express";
import { createOne, deleteOne, getAll, getOne } from "./refactorHandler";
import { uploadSingleImage } from "../middlewares/multerMiddleware";
import sharp from "sharp";
import userModel from "../models/userModel";
import { User } from "../interfaces/user";
import ApiError from "../utils/apiError";
import { deleteImage } from "../utils/deleteImage";

export const uploadUserImages = uploadSingleImage("image");

export const resizeImage = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    if (req.file) {
      const fileName = `user-${Date.now()}-cover.jpeg`;
      await sharp(req.file.buffer)
        .toFormat("jpeg")
        .jpeg({ quality: 90 })
        .toFile(`uploads/users/${fileName}`);
      req.body.image = fileName;
    }
    next();
  }
);

//create User
export const createUser = createOne<User>(userModel);

// get Users
export const getUsers = getAll<User>(userModel, "users");

// get User
export const getUser = getOne<User>(userModel);

// update User
export const updateUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const prevDocument: User | null = await userModel.findById(req.params.id);
    if (!prevDocument) {
      return next(new ApiError("user not found", 404));
    }

    deleteImage(userModel, prevDocument, req);

    const user: User | null = await userModel.findByIdAndUpdate(
      req.params.id,
      { name: req.body.name, active: req.body.active, image: req.body.image },
      { new: true }
    );
    res.status(200).json({ data: user });
  }
);

// delete User
export const deleteUser = deleteOne<User>(userModel);
