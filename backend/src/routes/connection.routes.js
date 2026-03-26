import { Router } from "express";
import wrapAsync from "../utils/wrapAsync.js";
import {
  getMyNetwork,
  getMyRequest,
  getPendingRequests,
  respondToRequest,
  sendConnectionRequest,
} from "../controllers/connection.controller.js";
import auth from "../middlewares/auth.js";

const router = Router();

router
  .route("request/:receiverId")
  .post(auth(["user"]), wrapAsync(sendConnectionRequest));
router
  .route("/respond/:requestId")
  .post(auth(["user"]), wrapAsync(respondToRequest));
router.route("/pending").get(auth(["user"]), wrapAsync(getPendingRequests));
router.route("/list").get(auth(["user"]), wrapAsync(getMyNetwork));
router.route("/requests").get(auth(["user"]), wrapAsync(getMyRequest));

export default router;
