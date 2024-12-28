import { Request } from "express";
import multer, { FileFilterCallback, Multer, StorageEngine } from "multer";
import ApiError from "../utils/apiError";
import { FieldsType } from "../interfaces/imageFields";

const uploadOptions = (): Multer => {
  const multerStorage: StorageEngine = multer.memoryStorage();
  const fileFilter = (
    req: Request,
    file: Express.Multer.File,
    cb: FileFilterCallback
  ) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new ApiError("Image Only", 400));
    }
  };
  return multer({ storage: multerStorage, fileFilter });
};

export const uploadSingleImage = (nameField: string) =>
  uploadOptions().single(nameField);

export const uploadMultiImages = (fields: FieldsType[]) =>
  uploadOptions().fields(fields);
