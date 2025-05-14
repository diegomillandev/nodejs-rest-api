import Post from "../models/post.model.js";
import { createPostSchema } from "../validations/post.validation.js";

export class PostController {
  static createPost = async (req, res) => {
    try {
      const postData = req.body;

      const { success, error, data } = createPostSchema.safeParse(postData);

      if (!success) {
        const errorMessages = error.errors.map((err) => {
          return {
            field: err.path.join("."),
            message: err.message,
          };
        });

        return res.status(400).json(errorMessages);
      }

      const post = new Post({
        ...data,
        userId: req.user._id,
      });

      await post.save();

      res.status(201).json({ message: "Post added successfully" });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  };

  static getAllPosts = async (req, res) => {
    try {
      // Logic to get all posts
      res.status(200).json({ message: "Posts retrieved successfully" });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  };

  static getPostById = async (req, res) => {
    try {
      // Logic to get a post by ID
      res.status(200).json({ message: "Post retrieved successfully" });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  };

  static updatePostById = async (req, res) => {
    try {
      // Logic to update a post
      res.status(200).json({ message: "Post updated successfully" });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  };

  static deletePostById = async (req, res) => {
    try {
      // Logic to delete a post
      res.status(200).json({ message: "Post deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  };
}
