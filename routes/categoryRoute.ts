import { Router } from "express";
import {
  createCategory,
  deleteCategory,
  getCategories,
  getCategory,
  updateCategory,
} from "../controllers/categoryController";
import {
  createCategoryValidator,
  deleteCategoryValidator,
  getCategoryValidator,
  updateCategoryValidator,
} from "../utils/validation/categoryValidator";

const CategoryRouter: Router = Router();

CategoryRouter.route("/")
  .post(createCategoryValidator, createCategory)
  .get(getCategories);

CategoryRouter.route("/:id")
  .get(getCategoryValidator, getCategory)
  .put(updateCategoryValidator, updateCategory)
  .delete(deleteCategoryValidator, deleteCategory);

export default CategoryRouter;