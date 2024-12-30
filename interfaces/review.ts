import { Document } from "mongoose";
import { Product } from "./product";
import { User } from "./user";

export interface Review extends Document {
  comment: string;
  rating: number;
  product: Product;
  user: User;
}
