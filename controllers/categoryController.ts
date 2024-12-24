import { Request, Response, NextFunction } from "express";
import { Category } from "../interfaces/category";
import categoryModel from "../models/categoryModel";
import asyncHandler from "express-async-handler";
import ApiError from "../utils/apiError";

//create category
export const createCategory = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const newCategory: Category = await categoryModel.create(req.body);
    res.status(201).json({ data: newCategory });
  }
);

// get categories
export const getCategories = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const categories = await categoryModel.find();
    res.status(200).json({ data: categories });
  }
);

// get category
export const getCategory = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const category = await categoryModel.findById(req.params.id);
    if (!category) {
      return next(new ApiError("category not found", 404));
    }
    res.status(200).json({ data: category });
  }
);

// update category
export const updateCategory = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const category = await categoryModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!category) {
      return next(new ApiError("category not found", 404));
    }
    res.status(200).json({ data: category });
  }
);

// delete category
export const deleteCategory = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const category = await categoryModel.findByIdAndDelete(req.params.id);
    if (!category) {
      return next(new ApiError("category not found", 404));
    }
    res.status(204).json();
  }
);
