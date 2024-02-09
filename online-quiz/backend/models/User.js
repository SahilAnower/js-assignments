import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      lowercase: true,
      unique: true,
      required: true,
      trim: true,
      validate: {
        validator: validator.isEmail,
        message: "Please enter a valid email address!",
      },
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);
