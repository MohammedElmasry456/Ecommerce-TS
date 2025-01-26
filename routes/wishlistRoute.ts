import { Router } from "express";
import {
  allowedTo,
  checkActive,
  protectRoute,
} from "../controllers/authController";
import {
  addToWishlist,
  getLoggedUserWishlist,
  removeFromWishlist,
} from "../controllers/wishlistController";

const wishlistRouter: Router = Router();
wishlistRouter.use(protectRoute, checkActive, allowedTo("user"));

wishlistRouter.route("/").post(addToWishlist).get(getLoggedUserWishlist);

wishlistRouter.route("/:id").delete(removeFromWishlist);

export default wishlistRouter;
