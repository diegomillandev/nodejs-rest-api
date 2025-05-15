import { FRONTEND_URL } from "../constants/env.js";

export const corsConfig = {
  origin: function (origin, callback) {
    const whitelist = [FRONTEND_URL];

    if (process.argv[2] === "--api") {
      whitelist.push(undefined);
      whitelist.push("http://localhost:4000");
    }
    if (whitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};
