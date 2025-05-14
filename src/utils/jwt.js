import jwt from "jsonwebtoken";
import { JWT_EXPIRATION, JWT_SECRET } from "../constants/env.js";
export const generateJWT = (id) => {
  const token = jwt.sign({ id }, JWT_SECRET, {
    expiresIn: JWT_EXPIRATION,
  });

  return token;
};
