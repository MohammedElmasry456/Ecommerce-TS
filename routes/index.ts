import { Application, Request, Response, NextFunction } from "express";
import CategoryRouter from "./categoryRoute";
import subcategoryRouter from "./subcategoryRoute";
import ApiError from "../utils/apiError";
import globalError from "../middlewares/globalErrors";
import productRouter from "./productRoute";
import userRouter from "./userRoute";
import authRouter from "./authRoute";
import reviewRouter from "./reviewRoute";

const mountRoutes = (app: Application) => {
  app.use("/api/v1/categories", CategoryRouter);
  app.use("/api/v1/subcategories", subcategoryRouter);
  app.use("/api/v1/products", productRouter);
  app.use("/api/v1/users", userRouter);
  app.use("/api/v1/auth", authRouter);
  app.use("/api/v1/reviews", reviewRouter);
  app.all("*", async (req: Request, res: Response, next: NextFunction) => {
    next(new ApiError(`The Route ${req.originalUrl} Not Found`, 404));
  });

  app.use(globalError);
};

export default mountRoutes;
