import { Schema, model } from "mongoose";
import { SubCategory } from "../interfaces/subcategory";

const subcategorySchema: Schema = new Schema<SubCategory>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "categories",
      required: true,
    },
  },
  { timestamps: true }
);

export default model<SubCategory>("subcategories", subcategorySchema);
