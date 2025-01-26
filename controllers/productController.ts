import asyncHandler from "express-async-handler";
import { Request, Response, NextFunction } from "express";
import {
  createOne,
  deleteOne,
  getAll,
  getOne,
  updateOne,
} from "./refactorHandler";
import { Product } from "../interfaces/product";
import productModel from "../models/productModel";
import { uploadMultiImages } from "../middlewares/multerMiddleware";
import sharp from "sharp";

export const uploadImages = uploadMultiImages([
  { name: "cover", maxCount: 1 },
  { name: "images", maxCount: 5 },
]);

export const resizeImage = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    if (req.files) {
      if (req.files.cover) {
        const fileName = `product-${Date.now()}-cover.png`;
        await sharp(req.files.cover[0].buffer)
          .toFormat("png")
          .png({ quality: 90 })
          .toFile(`uploads/products/${fileName}`);
        req.body.cover = fileName;
      }
      if (req.files.images) {
        req.body.images = [];
        await Promise.all(
          req.files.images.map(async (img: any, index: number) => {
            const imgName = `product-${Date.now()}-N(${index + 1}).png`;
            await sharp(img.buffer)
              .toFormat("png")
              .png({ quality: 90 })
              .toFile(`uploads/products/${imgName}`);
            req.body.images.push(imgName);
          })
        );
      }
    }
    next();
  }
);

//create Product
export const createProduct = createOne<Product>(productModel);

// get Products
export const getProducts = getAll<Product>(productModel, "products");

// get Product
export const getProduct = getOne<Product>(productModel, "reviews");

// update Product
export const updateProduct = updateOne<Product>(productModel);

// delete Product
export const deleteProduct = deleteOne<Product>(productModel);
