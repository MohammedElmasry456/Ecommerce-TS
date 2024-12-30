import { Review } from "../interfaces/review";
import { Request, Response, NextFunction } from "express";
import reviewModel from "../models/reviewModel";
import {
  createOne,
  deleteOne,
  getAll,
  getOne,
  updateOne,
} from "./refactorHandler";
import { FilterData } from "../interfaces/filterData";

export const filterReview = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let filterData: FilterData = {};
  if (req.params.productId) {
    filterData.product = req.params.productId;
  }
  req.filterData = filterData;
  next();
};

export const setUserAndProductId = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.body.product) {
    req.body.product = req.params.productId;
  }
  if (!req.body.user) {
    req.body.user = req.user?._id;
  }
  next();
};

//create Review
export const createReview = createOne<Review>(reviewModel);

// get Reviews
export const getReviews = getAll<Review>(reviewModel, "reviews");

// get Review
export const getReview = getOne<Review>(reviewModel);

// update Review
export const updateReview = updateOne<Review>(reviewModel);

// delete Review
export const deleteReview = deleteOne<Review>(reviewModel);
