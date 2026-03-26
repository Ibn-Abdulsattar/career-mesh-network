import { Post } from "../models/index.js";

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
    } catch {
      return next(new ExpressError("Upload failed!", 500));
    }
  }

  await Post.create({
    active,
    body: content,
    user_id,
    fileType: fileType,
    media: mediaUrl,
    likes: 0,
  });
};
