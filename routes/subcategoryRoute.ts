import { Router } from "express";
import {
  createSubcategory,
  deleteSubcategory,
  getSubcategories,
  getSubcategory,
  updateSubcategory,
} from "../controllers/subcategoryController";
import {
  createSubcategoryValidator,
  deleteSubcategoryValidator,
  getSubcategoryValidator,
  updateSubcategoryValidator,
} from "../utils/validation/subcategoryValidator";

const subcategoryRouter: Router = Router();

subcategoryRouter
  .route("/")
  .post(createSubcategoryValidator, createSubcategory)
  .get(getSubcategories);

subcategoryRouter
  .route("/:id")
  .get(getSubcategoryValidator, getSubcategory)
  .put(updateSubcategoryValidator, updateSubcategory)
  .delete(deleteSubcategoryValidator, deleteSubcategory);

export default subcategoryRouter;
