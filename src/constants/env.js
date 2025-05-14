import colors from "colors";

const getEnv = (key, defaultValue) => {
  const value = process.env[key] || defaultValue;

  if (value === undefined) {
    throw new Error(colors.red.bold(`Missing environment variable: ${key}`));
  }

  return value;
};

export const MONGO_URI = getEnv("MONGO_URI");
export const PORT = getEnv("PORT", 3000);
export const JWT_SECRET = getEnv("JWT_SECRET");
export const JWT_EXPIRATION = getEnv("JWT_EXPIRATION", "15m");
export const FRONTEND_URL = getEnv("FRONTEND_URL");
