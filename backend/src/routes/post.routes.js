import { Router } from "express";
import wrapAsync from "../utils/wrapAsync.js";
import auth from "../middlewares/auth.js";
import {
  createPost,
  deletePost,
  getAllPosts,
} from "../controllers/post.controller.js";
import upload from "../services/upload.js";
const router = Router();

router
  .route("/")
  .post(auth(["user"]), upload.single("media"), wrapAsync(createPost))
  .get(auth(["user"]), wrapAsync(getAllPosts));
router.route("/delete/:id").delete(auth(["user"]), wrapAsync(deletePost));

export default router;
