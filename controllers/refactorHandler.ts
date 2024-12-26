import { Request, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";
import ApiError from "../utils/apiError";
import { Model } from "mongoose";
import { FilterData } from "../interfaces/filterData";
import Features from "../utils/features";

export const createOne = <modelType>(model: Model<any>) =>
  asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const newDoc: modelType = await model.create(req.body);
      res.status(201).json({ data: newDoc });
    }
  );

export const getAll = <modelType>(model: Model<any>, modelName: string) =>
  asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      let filterData: FilterData = {};
      if (req.filterData) {
        filterData = req.filterData;
      }
      const apiFeatures: Features = new Features(
        model.find(filterData),
        req.query
      )
        .sort()
        .limitField()
        .search(modelName);

      const { mongooseQuery } = apiFeatures;
      const documents: modelType[] = await mongooseQuery;

      res.status(200).json({ data: documents });
    }
  );

export const getOne = <modelType>(model: Model<any>) =>
  asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const document: modelType | null = await model.findById(req.params.id);
      if (!document) {
        return next(new ApiError("document not found", 404));
      }
      res.status(200).json({ data: document });
    }
  );

export const updateOne = <modelType>(model: Model<any>) =>
  asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const document: modelType | null = await model.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!document) {
        return next(new ApiError("document not found", 404));
      }
      res.status(200).json({ data: document });
    }
  );

export const deleteOne = <modelType>(model: Model<any>) =>
  asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const document: modelType | null = await model.findByIdAndDelete(
        req.params.id
      );
      if (!document) {
        return next(new ApiError("document not found", 404));
      }
      res.status(204).json();
    }
  );
