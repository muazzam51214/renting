import { Router } from "express";
import {
  addReview,
  deleteReview
} from "../controllers/review.controllers.js";

const router = Router();

// Add Review
router.route("/listing/:id/").post(addReview);
// Delete Review
router.route("/listing/:id/:reviewId").delete(deleteReview);

export default router;