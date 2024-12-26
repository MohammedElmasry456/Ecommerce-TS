import { check } from "express-validator";
import validatorMiddleware from "../../middlewares/validatorMiddleware";
import { RequestHandler } from "express";
import subcategoryModel from "../../models/subcategoryModel";
import { SubCategory } from "../../interfaces/subcategory";

export const createCategoryValidator: RequestHandler[] = [
  check("name")
    .notEmpty()
    .withMessage("Category Name Is Required")
    .isLength({ min: 2, max: 50 })
    .withMessage("Length Must Be Between 2 and 50"),
  validatorMiddleware,
];

export const getCategoryValidator: RequestHandler[] = [
  check("id")
    .notEmpty()
    .withMessage("Id Is Required")
    .isMongoId()
    .withMessage("Invalid Id"),
  validatorMiddleware,
];

export const updateCategoryValidator: RequestHandler[] = [
  check("name")
    .optional()
    .isLength({ min: 2, max: 50 })
    .withMessage("Length Must Be Between 2 and 50"),
  check("id")
    .notEmpty()
    .withMessage("Id Is Required")
    .isMongoId()
    .withMessage("Invalid Id"),
  validatorMiddleware,
];
export const deleteCategoryValidator: RequestHandler[] = [
  check("id")
    .notEmpty()
    .withMessage("Id Is Required")
    .isMongoId()
    .withMessage("Invalid Id")
    .custom(async (val) => {
      const subcategories = await subcategoryModel.find({ category: val });
      if (subcategories.length > 0) {
        const bulkOptions = subcategories.map((subcategory: SubCategory) => ({
          deleteOne: { filter: { _id: subcategory._id } },
        }));
        await subcategoryModel.bulkWrite(bulkOptions);
      }
      return true;
    }),
  validatorMiddleware,
];
