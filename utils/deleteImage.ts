import { Model } from "mongoose";
import productModel from "../models/productModel";
import userModel from "../models/userModel";
import fs from "fs";
import { Request } from "express";

export const deleteImage = (model: Model<any>, document: any, req: Request) => {
  if (model === productModel) {
    if (
      (document.cover && req.body.cover) ||
      (document.cover && Object.keys(req.body).length === 0)
    ) {
      const img: string = document.cover.split("/").slice(-2).join("/");
      fs.unlink(`uploads/${img}`, (err) => {
        if (err) {
          console.log(err);
        }
      });
    }
    if (
      (document.images && req.body.images) ||
      (document.images && Object.keys(req.body).length === 0)
    ) {
      document.images.map((img: string) => {
        img = img.split("/").slice(-2).join("/");
        fs.unlink(`uploads/${img}`, (err) => {
          if (err) {
            console.log(err);
          }
        });
      });
    }
  } else if (model === userModel) {
    if (
      (document.image && req.body.image) ||
      (document.image && Object.keys(req.body).length === 0)
    ) {
      const img: string = document.image.split("/").slice(-2).join("/");
      fs.unlink(`uploads/${img}`, (err) => {
        if (err) {
          console.log(err);
        }
      });
    }
  }
};
