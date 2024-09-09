import mongoose, { Schema } from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";
const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique : [true, "User with this email already exists!"]
    },
  },
  { timestamps: true }
);

userSchema.plugin(passportLocalMongoose);
export const User = mongoose.model("User", userSchema);
