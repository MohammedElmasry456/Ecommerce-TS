import { Schema, model } from "mongoose";
import { Review } from "../interfaces/review";
import productModel from "./productModel";

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

reviewSchema.statics.calcAvgRating = async function (productId) {
  const results = await this.aggregate([
    { $match: { product: productId } },
    {
      $group: {
        _id: "product",
        ratingAverge: { $avg: "$rating" },
        ratingCount: { $sum: 1 },
      },
    },
  ]);

  if (results.length > 0) {
    await productModel.findByIdAndUpdate(productId, {
      ratingAverge: results[0].ratingAverge,
      ratingCount: results[0].ratingCount,
    });
  }
};

reviewSchema.post<Review>("save", async function () {
  await (this.constructor as any).calcAvgRating(this.product);
});

reviewSchema.pre<Review>(/^find/, function (next) {
  this.populate({ path: "user", select: "name image" });
  next();
});

export default model<Review>("reviews", reviewSchema);
