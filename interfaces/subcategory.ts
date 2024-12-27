import { Document, Schema } from "mongoose";
import { Category } from "./category";

export interface SubCategory extends Document {
  name: string;
  category: Category;
}
