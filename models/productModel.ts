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
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    id: false,
  }
);

productSchema.virtual("reviews", {
  ref: "reviews",
  foreignField: "product",
  localField: "_id",
});

const imageUrl = (document: Product) => {
  if (document.images) {
    const url: string[] = [];
    document.images.map((el: string) => {
      url.push(`${process.env.BASE_URL}/products/${el}`);
    });
    document.images = url;
  }
  if (document.cover) {
    const url: string = `${process.env.BASE_URL}/products/${document.cover}`;
    document.cover = url;
  }
};

productSchema.post("init", (document: Product) => {
  imageUrl(document);
});
productSchema.post("save", (document: Product) => {
  imageUrl(document);
});

productSchema.pre<Product>(/^find/, function (next) {
  this.populate({ path: "category", select: "name" });
  this.populate({ path: "subcategory", select: "name" });
  next();
});

export default model<Product>("products", productSchema);
