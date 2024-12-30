import { Router } from "express";
import {
  allowedTo,
  checkActive,
  protectRoute,
} from "../controllers/authController";
import {
  createReview,
  deleteReview,
  filterReview,
  getReview,
  getReviews,
  setUserAndProductId,
  updateReview,
} from "../controllers/reviewController";

const reviewRouter: Router = Router({ mergeParams: true });

reviewRouter
  .route("/")
  .post(
    protectRoute,
    checkActive,
    allowedTo("user"),
    setUserAndProductId,
    createReview
  )
  .get(filterReview, getReviews);

reviewRouter
  .route("/:id")
  .get(getReview)
  .put(protectRoute, checkActive, allowedTo("user"), updateReview)
  .delete(
    protectRoute,
    checkActive,
    allowedTo("admin", "manager", "user"),
    deleteReview
  );

export default reviewRouter;
