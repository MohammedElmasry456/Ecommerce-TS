import { Router } from "express";
import {
  createUser,
  deleteUser,
  getUser,
  getUsers,
  resizeImage,
  updateUser,
  uploadUserImages,
} from "../controllers/userController";
import {
  createUserValidator,
  deleteUserValidator,
  getUserValidator,
  updateUserValidator,
} from "../utils/validation/userValidator";

const userRouter: Router = Router();

userRouter
  .route("/")
  .post(uploadUserImages, resizeImage, createUserValidator, createUser)
  .get(getUsers);

userRouter
  .route("/:id")
  .get(getUserValidator, getUser)
  .put(uploadUserImages, resizeImage, updateUserValidator, updateUser)
  .delete(deleteUserValidator, deleteUser);

export default userRouter;
