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
import {
  createReviewValidator,
  deleteReviewValidator,
  getReviewValidator,
  updateReviewValidator,
} from "../utils/validation/reviewValidator";

const reviewRouter: Router = Router({ mergeParams: true });

reviewRouter
  .route("/")
  .post(
    protectRoute,
    checkActive,
    allowedTo("user"),
    setUserAndProductId,
    createReviewValidator,
    createReview
  )
  .get(filterReview, getReviews);

reviewRouter
  .route("/:id")
  .get(getReviewValidator, getReview)
  .put(
    protectRoute,
    checkActive,
    allowedTo("user"),
    updateReviewValidator,
    updateReview
  )
  .delete(
    protectRoute,
    checkActive,
    allowedTo("admin", "manager", "user"),
    deleteReviewValidator,
    deleteReview
  );

export default reviewRouter;
