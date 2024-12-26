import { Category } from "../interfaces/category";
import categoryModel from "../models/categoryModel";
import {
  createOne,
  deleteOne,
  getAll,
  getOne,
  updateOne,
} from "./refactorHandler";

//create category
export const createCategory = createOne<Category>(categoryModel);

// get categories
export const getCategories = getAll<Category>(categoryModel, "categories");

// get category
export const getCategory = getOne<Category>(categoryModel);

// update category
export const updateCategory = updateOne<Category>(categoryModel);

// delete category
export const deleteCategory = deleteOne<Category>(categoryModel);
