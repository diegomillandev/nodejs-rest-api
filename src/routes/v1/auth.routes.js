import { Router } from "express";
import { AuthController } from "../../controllers/auth.controller.js";
import {
  validateTokenInWhitelist,
  verifyAuthToken,
} from "../../middlewares/auth.middleware.js";

const router = Router();

//  Register route
router.post("/register", AuthController.register);

// Login route
router.post("/login", AuthController.login);

// Get user profile route
router.get(
  "/profile",
  validateTokenInWhitelist,
  verifyAuthToken,
  AuthController.getUserProfile
);

// Logout route
router.get("/logout", AuthController.logout);

export default router;
