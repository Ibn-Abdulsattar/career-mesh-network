import { Router } from "express";
import wrapAsync from "../utils/wrapAsync.js";
import auth from "../middlewares/auth.js";
import {
  createComment,
  deleteComment,
  getCommentsByPost,
} from "../controllers/comment.controller.js";
const router = Router({ mergeParams: true });

router
  .route("/")
  .post(auth(["user"]), wrapAsync(createComment))
  .get(wrapAsync(getCommentsByPost));

router.route("/:id").delete(auth(["user"]), wrapAsync(deleteComment));

export default router;
