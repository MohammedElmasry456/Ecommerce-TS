import { Schema, model } from "mongoose";
import { Category } from "../interfaces/category";

const categorySchema: Schema = new Schema<Category>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
  },
  { timestamps: true }
);

export default model<Category>("categories", categorySchema);
