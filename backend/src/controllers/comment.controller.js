import { Comment, Post } from "../models/index.js";
import ExpressError from "../utils/expressError.js";

export const createComment = async (req, res, next) => {
  const userId = req.body.user?.user_id;
  const { postId } = req.params;
  const { content } = req.body;

  const post = await Post.findOne({ where: { id: postId, active: true } });

  if (!post) {
    return next(new ExpressError("Post don't exist", 404));
  }
  const comment = await Comment.create({
    user_id: userId,
    post_id: id,
    body: content,
  });

  return res
    .status(201)
    .json({ message: "Comment created successfully!", data: comment });
};

export const getCommentsByPost = async (req, res, next) => {
  const { postId } = req.params;

  const post = await Post.findOne({ where: { id: postId, active: true } });

  if (!post) {
    return next(new ExpressError("Post don't exist", 404));
  }

  const allComments = await Comment.findAll({
    where: {
      post_id: postId,
    },
  });

  return res.status(200).json({ data: allComments });
};

export const deleteComment = async (req, res, next) => {
  const userId = req.user?.user_id;
  const { postId, id } = req.params;

  const post = await Post.findOne({
    where: {  id: postId, active: true },
  });

  if (!post) {
    return next(new ExpressError("Post don't exist", 404));
  }

  const comment = await Comment.findByPk(id);

  if (!comment) {
    return next(new ExpressError("Comment don't exist", 404));
  }

  if(userId.toString() !== comment.user_id.toString()){
    return next(new ExpressError("Unauthorize to delete this comment", 403));
  }

  await comment.destroy();

  return res.status(200).json({ message: "Comment deleted successfully!" });
};

