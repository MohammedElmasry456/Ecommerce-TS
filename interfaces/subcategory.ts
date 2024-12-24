import { Document, Schema } from "mongoose";

export interface SubCategory extends Document {
  name: string;
  category: Schema.Types.ObjectId;
}
