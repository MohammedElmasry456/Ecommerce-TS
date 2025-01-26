import asyncHandler from "express-async-handler";
import { Request, Response, NextFunction } from "express";
import { User } from "../interfaces/user";
import userModel from "../models/userModel";

//add to wishlist
export const addToWishlist = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const user: User | null = await userModel.findByIdAndUpdate(
      req.user?._id,
      { $addToSet: { wishlist: req.body.product } },
      { new: true }
    );
    res
      .status(200)
      .json({
        message: "product added to wishlist successfully",
        data: user?.wishlist,
      });
  }
);

//remove from wishlist
export const removeFromWishlist = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const user: User | null = await userModel.findByIdAndUpdate(
      req.user?._id,
      { $pull: { wishlist: req.params.id } },
      { new: true }
    );
    res
      .status(200)
      .json({
        message: "product removed from wishlist successfully",
        data: user?.wishlist,
      });
  }
);

//get wishlist
export const getLoggedUserWishlist = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const user: User | null = await userModel
      .findById(req.user?._id)
      .populate("wishlist");

    res
      .status(200)
      .json({ length: user?.wishlist.length, data: user?.wishlist });
  }
);
