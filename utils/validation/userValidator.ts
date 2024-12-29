import bcryptjs from "bcryptjs";
import { check } from "express-validator";
import validatorMiddleware from "../../middlewares/validatorMiddleware";
import { RequestHandler } from "express";
import userModel from "../../models/userModel";

export const createUserValidator: RequestHandler[] = [
  check("name")
    .notEmpty()
    .withMessage("User Name Is Required")
    .isLength({ min: 2, max: 50 })
    .withMessage("Length Must Be Between 2 and 50"),
  check("email")
    .notEmpty()
    .withMessage("Email Is Required")
    .isEmail()
    .withMessage("Invalid Email")
    .custom((val) =>
      userModel.findOne({ email: val }).then((res) => {
        if (res) {
          return Promise.reject(new Error("The Email Is Already Exist"));
        }
      })
    ),
  check("password")
    .notEmpty()
    .withMessage("Password Is Required")
    .isLength({ min: 6, max: 20 })
    .withMessage("Length Password Must Be Between 6 and 20")
    .custom((val, { req }) => {
      if (val !== req.body.confirmPassword) {
        throw new Error("password not equal the confirm");
      }
      return true;
    }),
  check("confirmPassword")
    .notEmpty()
    .withMessage("confirm Password Is Required")
    .isLength({ min: 6, max: 20 })
    .withMessage("Length Confirm Password Must Be Between 6 and 20"),
  validatorMiddleware,
];

export const getUserValidator: RequestHandler[] = [
  check("id")
    .notEmpty()
    .withMessage("Id Is Required")
    .isMongoId()
    .withMessage("Invalid Id"),
  validatorMiddleware,
];

export const updateUserValidator: RequestHandler[] = [
  check("id")
    .notEmpty()
    .withMessage("Id Is Required")
    .isMongoId()
    .withMessage("Invalid Id"),
  check("name")
    .optional()
    .isLength({ min: 2, max: 50 })
    .withMessage("Length Must Be Between 2 and 50"),
  check("active").optional().isBoolean().withMessage("Invalid Active Value"),
  validatorMiddleware,
];

export const deleteUserValidator: RequestHandler[] = [
  check("id")
    .notEmpty()
    .withMessage("Id Is Required")
    .isMongoId()
    .withMessage("Invalid Id"),
  validatorMiddleware,
];

export const updateLoggedUserValidator: RequestHandler[] = [
  check("name")
    .optional()
    .isLength({ min: 2, max: 50 })
    .withMessage("Length Must Be Between 2 and 50"),
  validatorMiddleware,
];

export const changeLoggedUserPasswordValidator: RequestHandler[] = [
  check("currentPassword")
    .notEmpty()
    .withMessage("current Password Is Required")
    .isLength({ min: 6, max: 20 })
    .withMessage("Length Current Password Must Be Between 6 and 20")
    .custom(async (val, { req }) => {
      const match = await bcryptjs.compare(val, req.user.password);
      if (!match) {
        throw new Error("current password not corrent");
      }
      return true;
    }),
  check("password")
    .notEmpty()
    .withMessage("Password Is Required")
    .isLength({ min: 6, max: 20 })
    .withMessage("Length Password Must Be Between 6 and 20")
    .custom((val, { req }) => {
      if (val !== req.body.confirmPassword) {
        throw new Error("password not equal the confirm");
      }
      return true;
    }),
  check("confirmPassword")
    .notEmpty()
    .withMessage("confirm Password Is Required")
    .isLength({ min: 6, max: 20 })
    .withMessage("Length Confirm Password Must Be Between 6 and 20"),
  validatorMiddleware,
];
