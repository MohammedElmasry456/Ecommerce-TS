import { Schema, model } from "mongoose";
import { Product } from "../interfaces/product";

const productSchema: Schema = new Schema<Product>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 500,
    },
    price: {
      type: Number,
      required: true,
      min: 1,
      max: 1000000,
    },
    priceAfterDiscount: {
      type: Number,
      min: 1,
      max: 1000000,
    },
    quantity: {
      type: Number,
      default: 0,
      min: 0,
    },
    sold: {
      type: Number,
      default: 0,
    },
    ratingAverge: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },
    ratingCount: {
      type: Number,
      default: 0,
    },
    cover: String,
    images: [String],
    category: {
      type: Schema.Types.ObjectId,
      ref: "categories",
      required: true,
    },
    subcategory: {
      type: Schema.Types.ObjectId,
      ref: "subcategories",
      required: true,
    },
  },
  { timestamps: true }
);

productSchema.pre<Product>(/^find/, function (next) {
  this.populate({ path: "category", select: "name" });
  this.populate({ path: "subcategory", select: "name" });
  next();
});

export default model<Product>("products", productSchema);
