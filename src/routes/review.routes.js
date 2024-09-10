import { Router } from "express";
import {
  addReview,
  deleteReview
} from "../controllers/review.controllers.js";
import { isLoggedInForReview } from "../middlewares/isLoggedIn.middleware.js";
import { isOwnerForReview } from "../middlewares/isOwner.middleware.js";


const router = Router();

// Add Review
router.route("/listing/:id/").post(isLoggedInForReview, addReview);
// Delete Review
router.route("/listing/:id/:reviewId").delete(isLoggedInForReview, isOwnerForReview, deleteReview);

export default router;