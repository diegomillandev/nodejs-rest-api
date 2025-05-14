import { exit } from "node:process";
import mongoose from "mongoose";
import colors from "colors";
import { MONGO_URI } from "../constants/env.js";

export const connectDB = async () => {
  try {
    const { connection } = await mongoose.connect(MONGO_URI);
    const url = `${connection.host}:${connection.port}`;
    console.log(colors.cyan.bold(`MongoDB connected: ${url}`));
  } catch (error) {
    console.error(colors.bgRed.white(`Error: ${error}`));
    exit(1);
  }
};
