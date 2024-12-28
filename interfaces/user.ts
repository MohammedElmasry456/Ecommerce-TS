import { Document } from "mongoose";

type Role = "user" | "manager" | "admin";

export interface User extends Document {
  name: string;
  email: string;
  password: string;
  image: string;
  role: Role;
  active: boolean;
  passwordChangedAt: Date | number;
  resetCode: string;
  resetCodeExpireAt: Date | number;
  verifyResetCode: boolean;
}
