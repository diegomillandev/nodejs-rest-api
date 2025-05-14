import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../constants/env.js";
import User from "../models/user.model.js";

export const validateTokenInWhitelist = async (req, res, next) => {};

export const verifyAuthToken = async (req, res, next) => {
  const bearer = req.headers.authorization;

  if (!bearer) {
    return res.status(401).json({ message: "Access denied" });
  }

  // Verify the token
  const [, token] = bearer.split(" ");

  if (!token) {
    return res.status(401).json({ message: "Invalid Token" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    const user = await User.findById(decoded.id).select("-password -__v");

    if (!user) {
      return res.status(401).json({ message: "Invalid Token" });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid Token" });
  }
};
