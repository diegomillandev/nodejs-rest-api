import "dotenv/config";

import express from "express";

import { fileURLToPath } from "url";
import path, { dirname } from "node:path";
import cors from "cors";
import { corsConfig } from "./config/cors.js";
import { connectDB } from "./config/db.js";
import router from "./routes/index.js";
import morgan from "morgan";

// Connect to MongoDB
connectDB();

// create __filename and __dirname
// __filename and __dirname are not available in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Create Express app
const app = express();

// Middlewares
app.use(cors(corsConfig));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));

// Routes
app.use("/api", router);

export default app;
