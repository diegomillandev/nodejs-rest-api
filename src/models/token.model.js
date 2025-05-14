import mongoose, { Schema, Types } from "mongoose";
import { JWT_EXPIRATION } from "../constants/env.js";

const tokenSchema = new Schema({
  userId: {
    type: Types.ObjectId,
    ref: "User",
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: JWT_EXPIRATION,
  },
});

const Token = mongoose.model("Token", tokenSchema);
export default Token;
