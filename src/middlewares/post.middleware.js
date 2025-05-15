import Post from "../models/post.model.js";

export const validatePost = async (req, res, next) => {
  const { id } = req.params;

  try {
    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Forbidden" });
    }

    req.post = post;
    next();
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
