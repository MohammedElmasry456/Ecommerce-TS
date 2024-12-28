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

const productRouter: Router = Router();

productRouter
  .route("/")
  .post(uploadImages, resizeImage, createProductValidator, createProduct)
  .get(getProducts);

productRouter
  .route("/:id")
  .get(getProductValidator, getProduct)
  .put(uploadImages, resizeImage, updateProductValidator, updateProduct)
  .delete(deleteProductValidator, deleteProduct);

export default productRouter;
