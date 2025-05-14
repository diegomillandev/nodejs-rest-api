import { Router } from "express";
import { PostController } from "../../controllers/post.controller.js";

const router = Router();

router.post("/", PostController.createPost);
router.get("/", PostController.getAllPosts);
router.get("/:id", PostController.getPostById);
router.put("/:id", PostController.updatePostById);
router.delete("/:id", PostController.deletePostById);

export default router;
