import { Router } from "express";
import {
  allListings,
  getListingById,
  addNewListing,
  createListing,
  editListing,
  updateListing,
  deleteListing,
  addReview,
  deleteReview
} from "../controllers/listing.controllers.js";

const router = Router();

router.route("/").get(allListings).post(createListing);

router.route("/new").get(addNewListing);
router.route("/:id").get(getListingById);
router.route("/:id/edit").get(editListing);
router.route("/:id").put(updateListing);
router.route("/:id").delete(deleteListing);
// Add Review
router.route("/:id/review").post(addReview);
// Delete Review
router.route("/:id/review/:reviewId").delete(deleteReview);
export default router;
