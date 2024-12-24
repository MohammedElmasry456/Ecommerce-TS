import { Application, Request, Response, NextFunction } from "express";
import CategoryRouter from "./categoryRoute";
import subcategoryRouter from "./subcategoryRoute";
import ApiError from "../utils/apiError";
import globalError from "../middlewares/globalErrors";

const mountRoutes = (app: Application) => {
  app.use("/api/v1/categories", CategoryRouter);
  app.use("/api/v1/subcategories", subcategoryRouter);
  app.all("*", async (req: Request, res: Response, next: NextFunction) => {
    next(new ApiError(`The Route ${req.originalUrl} Not Found`, 404));
  });

  app.use(globalError);
};

export default mountRoutes;
