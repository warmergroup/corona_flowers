import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    userName: { type: "string", required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isActivated: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const userModel = mongoose.model("User", userSchema);

export default userModel;
