import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
    },
    type: {
      type: String,
      default: "normal",
      enum: ["normal", "google"],
    },
    image: String,
    package: {
      type: String,
      default: "free",
      enum: ["free", "basic", "silver", "gold"],
    },
    tokens: {
      type: Number,
    },
    trialEnd: Number,
    packageEnd: Number,
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", userSchema);
