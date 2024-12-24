import { Request, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";
import subcategoryModel from "../models/subcategoryModel";
import { SubCategory } from "../interfaces/subcategory";
import ApiError from "../utils/apiError";

//create Subcategory
export const createSubcategory = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const newSubcategory: SubCategory = await subcategoryModel.create(req.body);
    res.status(201).json({ data: newSubcategory });
  }
);

// get subcategories
export const getSubcategories = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const subcategories = await subcategoryModel.find();
    res.status(200).json({ data: subcategories });
  }
);

// get subcategory
export const getSubcategory = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const subcategory = await subcategoryModel.findById(req.params.id);
    if (!subcategory) {
      return next(new ApiError("subcategory not found", 404));
    }
    res.status(200).json({ data: subcategory });
  }
);

// update subcategory
export const updateSubcategory = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const subcategory = await subcategoryModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!subcategory) {
      return next(new ApiError("subcategory not found", 404));
    }
    res.status(200).json({ data: subcategory });
  }
);

// delete subcategory
export const deleteSubcategory = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const subcategory = await subcategoryModel.findByIdAndDelete(req.params.id);
    if (!subcategory) {
      return next(new ApiError("subcategory not found", 404));
    }
    res.status(204).json();
  }
);
