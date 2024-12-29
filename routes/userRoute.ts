import { changeLoggedUserPasswordValidator } from "./../utils/validation/userValidator";
import { Router } from "express";
import {
  changeUserPassword,
  createUser,
  deleteUser,
  getUser,
  getUsers,
  resizeImage,
  setUserId,
  updateLoggedUser,
  updateLoggedUserPassword,
  updateUser,
  uploadUserImages,
} from "../controllers/userController";
import {
  createUserValidator,
  deleteUserValidator,
  getUserValidator,
  updateLoggedUserValidator,
  updateUserValidator,
} from "../utils/validation/userValidator";
import {
  allowedTo,
  checkActive,
  protectRoute,
} from "../controllers/authController";

const userRouter: Router = Router();
userRouter.use(protectRoute, checkActive);

userRouter.get("/me", setUserId, getUser);
userRouter.put(
  "/updateMe",
  uploadUserImages,
  resizeImage,
  updateLoggedUserValidator,
  updateLoggedUser
);
userRouter.put(
  "/changeMyPassword",
  changeLoggedUserPasswordValidator,
  updateLoggedUserPassword
);
userRouter.delete("/deleteMe", allowedTo("user"), setUserId, deleteUser);

userRouter.use(allowedTo("manager"));
userRouter
  .route("/")
  .post(uploadUserImages, resizeImage, createUserValidator, createUser)
  .get(getUsers);

userRouter
  .route("/:id")
  .get(getUserValidator, getUser)
  .put(uploadUserImages, resizeImage, updateUserValidator, updateUser)
  .delete(deleteUserValidator, deleteUser);

userRouter.put("/:id/changePassword", changeUserPassword);

export default userRouter;
