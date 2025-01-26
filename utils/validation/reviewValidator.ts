import { check } from "express-validator";
import validatorMiddleware from "../../middlewares/validatorMiddleware";
import { RequestHandler } from "express";
import reviewModel from "../../models/reviewModel";
import { Review } from "../../interfaces/review";

export const createReviewValidator: RequestHandler[] = [
  check("comment").notEmpty().withMessage("comment is required"),
  check("rating")
    .notEmpty()
    .withMessage("rating is required")
    .isFloat({ min: 1, max: 5 })
    .withMessage("Rating Between 1 And 5"),
  check("product")
    .notEmpty()
    .withMessage("product Id Is Required")
    .isMongoId()
    .withMessage("Invalid product Id"),
  check("user")
    .notEmpty()
    .withMessage("user Id Is Required")
    .isMongoId()
    .withMessage("Invalid user Id")
    .custom((val, { req }) =>
      reviewModel
        .findOne({ user: val, product: req.body.product })
        .then((res) => {
          if (res) {
            return Promise.reject(
              new Error("You Can't Add More Than 1 Review For The Same Product")
            );
          }
        })
    ),
  validatorMiddleware,
];

export const getReviewValidator: RequestHandler[] = [
  check("id")
    .notEmpty()
    .withMessage("Id Is Required")
    .isMongoId()
    .withMessage("Invalid Id"),
  validatorMiddleware,
];

export const updateReviewValidator: RequestHandler[] = [
  check("commit").optional(),
  check("rating")
    .optional()
    .isFloat({ min: 1, max: 5 })
    .withMessage("Rating Between 1 And 5"),
  check("id")
    .notEmpty()
    .withMessage("Id Is Required")
    .isMongoId()
    .withMessage("Invalid Id")
    .custom(async (val, { req }) => {
      const review: Review | null = await reviewModel.findById(val);
      if (!review) {
        throw new Error("Review Not Found");
      }
      if (review.user._id!.toString() !== req.user._id.toString()) {
        throw new Error("This Review Not Belong To You");
      }
      return true;
    }),
  validatorMiddleware,
];
export const deleteReviewValidator: RequestHandler[] = [
  check("id")
    .notEmpty()
    .withMessage("Id Is Required")
    .isMongoId()
    .withMessage("Invalid Id")
    .custom(async (val, { req }) => {
      const review: Review | null = await reviewModel.findById(val);
      if (!review) {
        throw new Error("Review Not Found");
      }
      if (
        review.user._id!.toString() !== req.user._id.toString() &&
        req.user.role === "user"
      ) {
        throw new Error("This Review Not Belong To You");
      }
      return true;
    }),
  validatorMiddleware,
];
