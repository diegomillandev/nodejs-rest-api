import Post from "../models/post.model.js";
import { postSchema } from "../validations/post.validation.js";

export class PostController {
  static createPost = async (req, res) => {
    try {
      const postData = req.body;

      const { success, error, data } = postSchema.safeParse(postData);

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
      const posts = await Post.find({ userId: req.user._id.toString() });

      res.status(200).json(posts);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  };

  static getPostById = async (req, res) => {
    res.status(200).json(req.post);
  };

  static updatePostById = async (req, res) => {
    try {
      const postData = req.body;

      const { success, error, data } = postSchema.safeParse(postData);

      if (!success) {
        const errorMessages = error.errors.map((err) => {
          return {
            field: err.path.join("."),
            message: err.message,
          };
        });

        return res.status(400).json(errorMessages);
      }

      req.post.title = data.title;
      req.post.content = data.content;
      req.post.status = data.status;

      await req.post.save();
      res.status(200).json({ message: "Post updated successfully" });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  };

  static deletePostById = async (req, res) => {
    try {
      await req.post.deleteOne();
      res.status(200).json({ message: "Post deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  };
}
