import mongoose, { Schema } from "mongoose";
import { hashValue } from "../utils/bcrypt.js";

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    enum: ["male", "female", "other"],
    default: "other",
  },
});

userSchema.pre("save", async function (next) {
  // Hash the password before saving
  if (this.isModified("password")) {
    this.password = await hashValue(this.password);
  }
  next();
});

const User = mongoose.model("User", userSchema);
export default User;
