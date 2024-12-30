import { Schema, model } from "mongoose";
import { Review } from "../interfaces/review";

const reviewSchema: Schema = new Schema<Review>(
  {
    comment: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: "products",
      required: true,
    },
  },
  { timestamps: true }
);

export default model<Review>("reviews", reviewSchema);
