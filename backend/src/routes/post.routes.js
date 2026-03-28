import { Router } from "express";
import wrapAsync from "../utils/wrapAsync.js";
import auth from "../middlewares/auth.js";
import {
  createPost,
  deletePost,
  getAllPosts,
  incrementLikes,
} from "../controllers/post.controller.js";
import upload from "../services/upload.js";
import commentRoutes from "./comment.routes.js"
const router = Router();

router.use("/:postId/comment", commentRoutes);

router
  .route("/")
  .post(auth(["user"]), upload.single("media"), wrapAsync(createPost))
  .get(auth(["user"]), wrapAsync(getAllPosts));
router.route("/:postId").delete(auth(["user"]), wrapAsync(deletePost)).put(wrapAsync(incrementLikes));

export default router;
