import { Post } from "../models/index.js";
import  mediaQueue  from "../queue.js";
import ExpressError from "../utils/expressError.js";

export const createPost = async (req, res, next) => {
  const user_id = req.user.user_id;
  const { content, active } = req.body;
  
  let mediaUrl = null;
  let mimetype = null;

  if (req.file) {
    try {
      const { filename, mimetype: fileMimetype } = req.file;
      mimetype = fileMimetype;

      mediaUrl = `${req.protocol}://${req.get("host")}/upload/${filename}`;

      await mediaQueue.add("filter-media", {
        url: mediaUrl,
        fileType: mimetype,
        fileName: filename,
      }, { 
        attempts: 3, 
        backoff: { type: "exponential", delay: 5000 } 
      });
      
    } catch (error) {
      return next(new ExpressError("Queue processing failed!", 500));
    }
  }

  if (!content && !mediaUrl) {
    return next(new ExpressError("Post cannot be empty!", 400));
  }

  const newPost = await Post.create({
    active: active ?? true,
    body: content,
    user_id,
    fileType: mimetype,
    media: mediaUrl,
    likes: 0,
  });

  return res.status(201).json({ 
    message: "New Post created successfully!", 
    data: newPost 
  });
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
  const { postId } = req.params;

  const post = await Post.findByPk(postId);

  if (!post) {
    return next(new ExpressError("No Record found!", 400));
  }

  if (post.user_id.toString() !== userId.toString()) {
    return next(new ExpressError("Unauthorized to delete this post", 400));
  }

  await post.update({ active: false });

  return res.status(200).json({ message: "Post deleted successfully!" });
};

export const incrementLikes = async (req, res, next) => {
  const { postId } = req.params;

  const post = await Post.findOne({
    where: { id: postId, active: true },
  });

  if (!post) {
    return next(new ExpressError("Post don't exist", 404));
  }

  await post.increment("likes");
  await post.reload();

  return res.status(200).json({
    message: "Post liked successfully!",
    likes: post.likes,
  });
};
