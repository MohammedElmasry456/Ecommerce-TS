import jwt from "jsonwebtoken";
export const createToken = (userId: any) =>
  jwt.sign({ userId }, process.env.JWT_SECRET_KEY!, {
    expiresIn: process.env.JWT_EXPIRE_TIME,
  });

export const createResetToken = (userId: any) =>
  jwt.sign({ userId }, process.env.JWT_SECRET_KEY!, {
    expiresIn: process.env.RESET_EXPIRE_TIME,
  });
