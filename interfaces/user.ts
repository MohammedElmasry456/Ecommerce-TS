import { Document } from "mongoose";
import { Product } from "./product";

type Role = "user" | "manager" | "admin";

export interface User extends Document {
  name: string;
  email: string;
  password: string;
  image: string;
  role: Role;
  active: boolean;
  wishlist: Product[];
  passwordChangedAt: Date | number;
  resetCode: string | undefined;
  resetCodeExpireAt: Date | number | undefined;
  verifyResetCode: boolean | undefined;
}
