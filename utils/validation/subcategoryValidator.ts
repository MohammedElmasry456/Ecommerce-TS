import { check } from "express-validator";
import validatorMiddleware from "../../middlewares/validatorMiddleware";
import { RequestHandler } from "express";
import categoryModel from "../../models/categoryModel";

export const createSubcategoryValidator: RequestHandler[] = [
  check("name")
    .notEmpty()
    .withMessage("Subcategory Name Is Required")
    .isLength({ min: 2, max: 50 })
    .withMessage("Length Must Be Between 2 and 50"),
  check("category")
    .notEmpty()
    .withMessage("Category Id Is Required")
    .isMongoId()
    .withMessage("Invalid Id")
    .custom((val) =>
      categoryModel.findById(val).then((res) => {
        if (!res) {
          return Promise.reject(new Error("This category not found"));
        }
      })
    ),
  validatorMiddleware,
];

export const getSubcategoryValidator: RequestHandler[] = [
  check("id")
    .notEmpty()
    .withMessage("Id Is Required")
    .isMongoId()
    .withMessage("Invalid Id"),
  validatorMiddleware,
];

export const updateSubcategoryValidator: RequestHandler[] = [
  check("name")
    .optional()
    .isLength({ min: 2, max: 50 })
    .withMessage("Length Must Be Between 2 and 50"),
  check("category")
    .optional()
    .isMongoId()
    .withMessage("Invalid Id")
    .custom((val) =>
      categoryModel.findById(val).then((res) => {
        if (!res) {
          return Promise.reject(new Error("This category not found"));
        }
      })
    ),
  check("id")
    .notEmpty()
    .withMessage("Id Is Required")
    .isMongoId()
    .withMessage("Invalid Id"),
  validatorMiddleware,
];
export const deleteSubcategoryValidator: RequestHandler[] = [
  check("id")
    .notEmpty()
    .withMessage("Id Is Required")
    .isMongoId()
    .withMessage("Invalid Id"),
  validatorMiddleware,
];
