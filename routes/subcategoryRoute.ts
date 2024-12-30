import { Router } from "express";
import {
  createSubcategory,
  deleteSubcategory,
  filterData,
  getSubcategories,
  getSubcategory,
  setCategoryId,
  updateSubcategory,
} from "../controllers/subcategoryController";
import {
  createSubcategoryValidator,
  deleteSubcategoryValidator,
  getSubcategoryValidator,
  updateSubcategoryValidator,
} from "../utils/validation/subcategoryValidator";
import {
  allowedTo,
  checkActive,
  protectRoute,
} from "../controllers/authController";

const subcategoryRouter: Router = Router({ mergeParams: true });

subcategoryRouter
  .route("/")
  .post(
    protectRoute,
    checkActive,
    allowedTo("admin", "manager"),
    setCategoryId,
    createSubcategoryValidator,
    createSubcategory
  )
  .get(filterData, getSubcategories);

subcategoryRouter
  .route("/:id")
  .get(getSubcategoryValidator, getSubcategory)
  .put(
    protectRoute,
    checkActive,
    allowedTo("admin", "manager"),
    updateSubcategoryValidator,
    updateSubcategory
  )
  .delete(
    protectRoute,
    checkActive,
    allowedTo("admin", "manager"),
    deleteSubcategoryValidator,
    deleteSubcategory
  );

export default subcategoryRouter;
