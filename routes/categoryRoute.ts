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
import subcategoryRouter from "./subcategoryRoute";
import {
  allowedTo,
  checkActive,
  protectRoute,
} from "../controllers/authController";

const CategoryRouter: Router = Router();

CategoryRouter.use("/:categoryId/subcategories", subcategoryRouter);

CategoryRouter.route("/")
  .post(
    protectRoute,
    checkActive,
    allowedTo("admin", "manager"),
    createCategoryValidator,
    createCategory
  )
  .get(getCategories);

CategoryRouter.route("/:id")
  .get(getCategoryValidator, getCategory)
  .put(
    protectRoute,
    checkActive,
    allowedTo("admin", "manager"),
    updateCategoryValidator,
    updateCategory
  )
  .delete(
    protectRoute,
    checkActive,
    allowedTo("admin", "manager"),
    deleteCategoryValidator,
    deleteCategory
  );

export default CategoryRouter;
