import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getProduct,
  getProducts,
  resizeImage,
  updateProduct,
  uploadImages,
} from "../controllers/productController";
import {
  createProductValidator,
  deleteProductValidator,
  getProductValidator,
  updateProductValidator,
} from "../utils/validation/productValidator";
import {
  allowedTo,
  checkActive,
  protectRoute,
} from "../controllers/authController";
import reviewRouter from "./reviewRoute";

const productRouter: Router = Router();
productRouter.use("/:productId/reviews", reviewRouter);

productRouter
  .route("/")
  .post(
    protectRoute,
    checkActive,
    allowedTo("admin", "manager"),
    uploadImages,
    resizeImage,
    createProductValidator,
    createProduct
  )
  .get(getProducts);

productRouter
  .route("/:id")
  .get(getProductValidator, getProduct)
  .put(
    protectRoute,
    checkActive,
    allowedTo("admin", "manager"),
    uploadImages,
    resizeImage,
    updateProductValidator,
    updateProduct
  )
  .delete(
    protectRoute,
    checkActive,
    allowedTo("admin", "manager"),
    deleteProductValidator,
    deleteProduct
  );

export default productRouter;
