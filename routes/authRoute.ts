import { Router } from "express";
import {
  createUserValidator,
  deleteUserValidator,
  getUserValidator,
  updateUserValidator,
} from "../utils/validation/userValidator";
import { login, signUp } from "../controllers/authController";

const authRouter: Router = Router();

authRouter.route("/signUp").post(createUserValidator, signUp);
authRouter.route("/login").post(login);

export default authRouter;
