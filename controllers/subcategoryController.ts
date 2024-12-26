import { Request, Response, NextFunction } from "express";
import subcategoryModel from "../models/subcategoryModel";
import { SubCategory } from "../interfaces/subcategory";
import { FilterData } from "../interfaces/filterData";
import {
  createOne,
  deleteOne,
  getAll,
  getOne,
  updateOne,
} from "./refactorHandler";

export const filterData = (req: Request, res: Response, next: NextFunction) => {
  let filterData: FilterData = {};
  if (req.params.categoryId) {
    filterData.category = req.params.categoryId;
  }
  req.filterData = filterData;
  next();
};

//create subcategory
export const createSubcategory = createOne<SubCategory>(subcategoryModel);

// get subcategories
export const getSubcategories = getAll<SubCategory>(
  subcategoryModel,
  "subcategories"
);

// get subcategory
export const getSubcategory = getOne<SubCategory>(subcategoryModel);

// update subcategory
export const updateSubcategory = updateOne<SubCategory>(subcategoryModel);

// delete subcategory
export const deleteSubcategory = deleteOne<SubCategory>(subcategoryModel);
