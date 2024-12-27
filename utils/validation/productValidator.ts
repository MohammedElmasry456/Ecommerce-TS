import { check } from "express-validator";
import validatorMiddleware from "../../middlewares/validatorMiddleware";
import { RequestHandler } from "express";
import categoryModel from "../../models/categoryModel";
import subcategoryModel from "../../models/subcategoryModel";

export const createProductValidator: RequestHandler[] = [
  check("name")
    .notEmpty()
    .withMessage("Product Name Is Required")
    .isLength({ min: 2, max: 50 })
    .withMessage("Length Must Be Between 2 and 50"),
  check("description")
    .notEmpty()
    .withMessage("Product Description Is Required")
    .isLength({ min: 5, max: 500 })
    .withMessage("Description Length Must Be Between 5 and 500"),
  check("price")
    .notEmpty()
    .withMessage("Product Price Is Required")
    .toFloat()
    .isFloat({ min: 1, max: 1000000 })
    .withMessage("Product Price Must Be Between $1 and $1000000"),
  check("priceAfterDiscount")
    .optional()
    .toFloat()
    .isFloat({ min: 1, max: 1000000 })
    .withMessage("Product Price Must Be Between $1 and $1000000"),
  check("quantity")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Product Quantity Can't Be Lower Than 0")
    .toInt(),
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
  check("subcategory")
    .notEmpty()
    .withMessage("Subcategory Id Is Required")
    .isMongoId()
    .withMessage("Invalid Id")
    .custom((val, { req }) =>
      subcategoryModel.findById(val).then((res) => {
        if (!res) {
          return Promise.reject(new Error("This subcategory not found"));
        }
        if (res.category._id?.toString() !== req.body.category.toString()) {
          return Promise.reject(
            new Error("Subcategory Not Belong To The Entered Category")
          );
        }
      })
    ),
  validatorMiddleware,
];

export const getProductValidator: RequestHandler[] = [
  check("id")
    .notEmpty()
    .withMessage("Id Is Required")
    .isMongoId()
    .withMessage("Invalid Id"),
  validatorMiddleware,
];

export const updateProductValidator: RequestHandler[] = [
  check("name")
    .optional()
    .isLength({ min: 2, max: 50 })
    .withMessage("Length Must Be Between 2 and 50"),
  check("description")
    .optional()
    .isLength({ min: 5, max: 500 })
    .withMessage("Description Length Must Be Between 5 and 500"),
  check("price")
    .optional()
    .toFloat()
    .isFloat({ min: 1, max: 1000000 })
    .withMessage("Product Price Must Be Between $1 and $1000000"),
  check("priceAfterDiscount")
    .optional()
    .toFloat()
    .isFloat({ min: 1, max: 1000000 })
    .withMessage("Product Price Must Be Between $1 and $1000000"),
  check("quantity")
    .optional()
    .toInt()
    .isInt({ min: 0 })
    .withMessage("Product Quantity Can't Be Lower Than 0"),
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
  check("subcategory")
    .optional()
    .isMongoId()
    .withMessage("Invalid Id")
    .custom((val, { req }) =>
      subcategoryModel.findById(val).then((res) => {
        if (!res) {
          return Promise.reject(new Error("This subcategory not found"));
        }
        if (res.category._id?.toString() !== req.body.category.toString()) {
          return Promise.reject(
            new Error("Subcategory Not Belong To The Entered Category")
          );
        }
      })
    ),
  validatorMiddleware,
];
export const deleteProductValidator: RequestHandler[] = [
  check("id")
    .notEmpty()
    .withMessage("Id Is Required")
    .isMongoId()
    .withMessage("Invalid Id"),
  validatorMiddleware,
];
