import { Router } from "express";
import {
  createUserValidator,
  deleteUserValidator,
  forgetPasswordValidator,
  getUserValidator,
  resetCodeValidator,
  updateUserValidator,
} from "../utils/validation/userValidator";
import {
  login,
  resetCode,
  signUp,
  verifyResetCode,
} from "../controllers/authController";
import { forgetPassword } from "../controllers/authController";

const authRouter: Router = Router();

authRouter.route("/signUp").post(createUserValidator, signUp);
authRouter.route("/login").post(login);
authRouter.post("/forgetPassword", forgetPasswordValidator, forgetPassword);
authRouter.post("/verifyResetCode", verifyResetCode);
authRouter.put("/resetCode", resetCodeValidator, resetCode);

export default authRouter;
