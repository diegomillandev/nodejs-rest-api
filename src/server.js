import "dotenv/config";

import express from "express";
import swaggerUI from "swagger-ui-express";

import cors from "cors";
import { corsConfig } from "./config/cors.js";
import { connectDB } from "./config/db.js";
import router from "./routes/index.js";
import morgan from "morgan";
import specs from "../swagger/swagger.js";
// Connect to MongoDB
connectDB();

// Create Express app
const app = express();

// Middlewares
app.use(cors(corsConfig));
app.use(express.json());
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));

// Routes
app.use("/api", router);

export default app;
