import { Router } from "express";
import {
  createSubcategory,
  deleteSubcategory,
  filterData,
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

const subcategoryRouter: Router = Router({ mergeParams: true });

subcategoryRouter
  .route("/")
  .post(createSubcategoryValidator, createSubcategory)
  .get(filterData, getSubcategories);

subcategoryRouter
  .route("/:id")
  .get(getSubcategoryValidator, getSubcategory)
  .put(updateSubcategoryValidator, updateSubcategory)
  .delete(deleteSubcategoryValidator, deleteSubcategory);

export default subcategoryRouter;
