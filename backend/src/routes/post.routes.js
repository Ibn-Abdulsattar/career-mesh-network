import { Router } from "express";
import wrapAsync from "../utils/wrapAsync.js";
import auth from "../middlewares/auth.js";
import { createPost } from "../controllers/post.controller.js";
import upload from "../services/upload.js";
const router = Router();

router.route("/").post(auth(["user"]), upload.single("media") , wrapAsync(createPost));

export default router;