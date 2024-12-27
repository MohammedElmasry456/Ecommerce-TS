import { Application, Request, Response, NextFunction } from "express";
import CategoryRouter from "./categoryRoute";
import subcategoryRouter from "./subcategoryRoute";
import ApiError from "../utils/apiError";
import globalError from "../middlewares/globalErrors";
import productRouter from "./productRoute";

const mountRoutes = (app: Application) => {
  app.use("/api/v1/categories", CategoryRouter);
  app.use("/api/v1/subcategories", subcategoryRouter);
  app.use("/api/v1/products", productRouter);
  app.all("*", async (req: Request, res: Response, next: NextFunction) => {
    next(new ApiError(`The Route ${req.originalUrl} Not Found`, 404));
  });

  app.use(globalError);
};

export default mountRoutes;
