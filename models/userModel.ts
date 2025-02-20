import { Schema, model } from "mongoose";
import bcryptjs from "bcryptjs";
import { User } from "../interfaces/user";

const userSchema: Schema = new Schema<User>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      maxlength: 20,
    },
    image: String,
    role: { type: String, enum: ["user", "admin", "manager"], default: "user" },
    active: { type: Boolean, default: true },
    wishlist: [
      {
        type: Schema.Types.ObjectId,
        ref: "products",
      },
    ],
    passwordChangedAt: Date,
    resetCode: String,
    resetCodeExpireAt: Date,
    verifyResetCode: Boolean,
  },
  { timestamps: true }
);

const imageUrl = (document: User) => {
  if (document.image) {
    const img: string = document.image.split("/").slice(-1)[0];
    const url: string = `${process.env.BASE_URL}/users/${img}`;
    document.image = url;
  }
};

// userSchema.post("init", (document: User) => {
//   imageUrl(document);
// });
userSchema.post("save", (document: User) => {
  imageUrl(document);
});

userSchema.pre<User>("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcryptjs.hash(this.password, 12);
  next();
});

userSchema.methods.toJSON = function () {
  const user = this;
  const obj = user.toObject();
  delete obj["password"];
  return obj;
};

export default model<User>("users", userSchema);
