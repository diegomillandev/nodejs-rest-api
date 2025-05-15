import { Router } from "express";
import { PostController } from "../../controllers/post.controller.js";
import {
  validateTokenInWhitelist,
  verifyAuthToken,
} from "../../middlewares/auth.middleware.js";
import { validatePost } from "../../middlewares/post.middleware.js";

const router = Router();

router.use(validateTokenInWhitelist, verifyAuthToken);

/**
 * @swagger
 * tags:
 *   name: Posts
 *   description: Post routes
 */

/**
 * @swagger
 * /posts:
 *   post:
 *     summary: Create a new post
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - content
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Mi primer post"
 *               content:
 *                 type: string
 *                 example: "Este es el contenido del post"
 *               status:
 *                 type: string
 *                 enum: [draft, published]
 *                 example: "published"
 *     responses:
 *       201:
 *         description: Post created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Post added successfully
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   field:
 *                     type: string
 *                   message:
 *                     type: string
 *       401:
 *         description: Unauthorized (missing or invalid token)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Access denied
 *       500:
 *         description: Internal server error
 */
router.post("/", PostController.createPost);
/**
 * @swagger
 * /posts:
 *   get:
 *     summary: Get all posts created by the authenticated user
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of user posts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: "64f1cba0a7e849001f3c2211"
 *                   title:
 *                     type: string
 *                     example: "Mi primer post"
 *                   content:
 *                     type: string
 *                     example: "Este es el contenido de mi post"
 *                   status:
 *                     type: string
 *                     enum: [draft, published]
 *                     example: "published"
 *                   userId:
 *                     type: string
 *                     example: "64f1cb1ba7e849001f3c220f"
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     example: "2024-09-01T12:34:56.789Z"
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *                     example: "2024-09-01T12:34:56.789Z"
 *       401:
 *         description: Unauthorized (missing or invalid token)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Access denied
 *       500:
 *         description: Internal server error
 */
router.get("/", PostController.getAllPosts);
router.param("id", validatePost);

/**
 * @swagger
 * /posts/{id}:
 *   get:
 *     summary: Get a post by ID
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the post
 *     responses:
 *       200:
 *         description: Post found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: 64fcba9c9a56b5e1b5c7a8e0
 *                 title:
 *                   type: string
 *                   example: Título del post
 *                 content:
 *                   type: string
 *                   example: Contenido del post
 *                 status:
 *                   type: string
 *                   enum: [draft, published]
 *                   example: published
 *                 userId:
 *                   type: string
 *                   example: 64fcb9feaf7a1a40c1a6e3c7
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *       401:
 *         description: Unauthorized (missing or invalid token)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Access denied
 *       403:
 *         description: Forbidden (user does not own the post)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Forbidden
 *       404:
 *         description: Post not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Post not found
 *       500:
 *         description: Internal server error
 */
router.get("/:id", PostController.getPostById);

/**
 * @swagger
 * /posts/{id}:
 *   put:
 *     summary: Update a post by ID
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the post to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - content
 *               - status
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Título actualizado"
 *               content:
 *                 type: string
 *                 example: "Contenido actualizado del post"
 *               status:
 *                 type: string
 *                 enum: [draft, published]
 *                 example: "draft"
 *     responses:
 *       200:
 *         description: Post updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Post updated successfully
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   field:
 *                     type: string
 *                   message:
 *                     type: string
 *       401:
 *         description: Unauthorized (missing or invalid token)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Access denied
 *       403:
 *         description: Forbidden (user does not own the post)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Forbidden
 *       404:
 *         description: Post not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Post not found
 *       500:
 *         description: Internal server error
 */
router.put("/:id", PostController.updatePostById);

/**
 * @swagger
 * /posts/{id}:
 *   delete:
 *     summary: Delete a post by ID
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the post to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Post deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Post deleted successfully
 *       401:
 *         description: Unauthorized (missing or invalid token)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Access denied
 *       403:
 *         description: Forbidden (user does not own the post)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Forbidden
 *       404:
 *         description: Post not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Post not found
 *       500:
 *         description: Internal server error
 */
router.delete("/:id", PostController.deletePostById);

export default router;
