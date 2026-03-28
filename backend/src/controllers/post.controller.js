import { Post } from "../models/index.js";
// import { mediaQueue } from "../queue.js";
import ExpressError from "../utils/expressError.js";

export const createPost = async (req, res, next) => {
  const user_id = req.user.user_id;
  console.log(req.body);
  const { content, active } = req.body;

  let mediaUrl, fileType;
  const file = req.file;
  fileType = req.file ? file.mimetype : "";
  if (file) {
    try {
      mediaUrl = `${req.protocol}://${req.get("host")}/upload/${req.file.filename}`;

      // await mediaQueue.add("moderate-media", {
      //   fileType: fileType,
      //   filePath: mediaUrl,
      // });
    } catch {
      return next(new ExpressError("Upload failed!", 500));
    }
  }

  if (!content && !mediaUrl) {
    return next(
      new ExpressError(
        "Post cannot be empty! Please provide text or media.",
        400,
      ),
    );
  }

  const newPost = await Post.create({
    active: active ?? true,
    body: content,
    user_id,
    fileType: fileType,
    media: mediaUrl,
    likes: 0,
  });

  return res
    .status(201)
    .json({ message: "New Post created successfully!", data: newPost });
};

export const getAllPosts = async (req, res, next) => {
  const userId = req.user.user_id;
  const allPosts = await Post.findAll({
    where: { user_id: userId, active: true },
  });

  return res.status(200).json({ data: allPosts });
};

export const deletePost = async (req, res, next) => {
  const userId = req.user.user_id;
  const { id } = req.params;

  const post = await Post.findByPk(id);

  if (!post) {
    return next(new ExpressError("No Record found!", 400));
  }

  if (post.user_id.toString() !== userId.toString()) {
    return next(new ExpressError("Unauthorized to delete this post", 400));
  }

  await post.update({ active: false });

  return res.status(200).json({ message: "Post deleted successfully!" });
};
