import { Router } from "express";
import { PostController } from "../../controllers/post.controller.js";
import {
  validateTokenInWhitelist,
  verifyAuthToken,
} from "../../middlewares/auth.middleware.js";

const router = Router();

router.use(validateTokenInWhitelist, verifyAuthToken);

router.post("/", PostController.createPost);
router.get("/", PostController.getAllPosts);
router.get("/:id", PostController.getPostById);
router.put("/:id", PostController.updatePostById);
router.delete("/:id", PostController.deletePostById);

export default router;
