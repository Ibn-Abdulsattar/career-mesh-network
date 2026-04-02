import { Router } from "express";
import wrapAsync from "../utils/wrapAsync.js";
import {
  forgot,
  getAllUsers,
  login,
  logout,
  register,
  resetPassword,
  verifyOtp,
} from "../controllers/auth.controller.js";
import auth from "../middlewares/auth.js";
const router = Router();

router.route("/login").post(wrapAsync(login));
router.route("/register").post(wrapAsync(register));
router.route("/all-users").get(wrapAsync(getAllUsers));
router.route("/logout").post(auth(["user"]), wrapAsync(logout));
router.route("/forgot").post(wrapAsync(forgot));
router.route("/reset-password").post(wrapAsync(resetPassword));
router.post("/verify-otp", wrapAsync(verifyOtp));

export default router;
