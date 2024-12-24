import { check } from "express-validator";
import validatorMiddleware from "../../middlewares/validatorMiddleware";
import { RequestHandler } from "express";

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
    .withMessage("Invalid Id"),
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
  check("category").optional().isMongoId().withMessage("Invalid Id"),
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
