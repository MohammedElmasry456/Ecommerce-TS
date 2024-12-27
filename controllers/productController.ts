import { Request, Response, NextFunction } from "express";
import { FilterData } from "../interfaces/filterData";
import {
  createOne,
  deleteOne,
  getAll,
  getOne,
  updateOne,
} from "./refactorHandler";
import { Product } from "../interfaces/product";
import productModel from "../models/productModel";
import multer from "multer";

const multerStorage = multer.diskStorage({
  destination: (req: Request, file: any, cb: any) => {
    cb(null, "uploads");
  },
  filename: (req: Request, file: any, cb: any) => {
    const ext = file.mimetype.split("/")[1];
    const fileName = `Products-${Date.now()}-cover.${ext}`;
    cb(null, fileName);
  },
});

export const uploadImage = multer({ storage: multerStorage }).single("cover");

//create Product
export const createProduct = createOne<Product>(productModel);

// get Products
export const getProducts = getAll<Product>(productModel, "products");

// get Product
export const getProduct = getOne<Product>(productModel);

// update Product
export const updateProduct = updateOne<Product>(productModel);

// delete Product
export const deleteProduct = deleteOne<Product>(productModel);
