import { Router } from "express";
import {
  allListings,
  getListingById,
  addNewListing,
  createListing,
  editListing,
  updateListing,
  deleteListing
} from "../controllers/listing.controllers.js";

const router = Router();

router.route("/").get(allListings).post(createListing);

router.route("/new").get(addNewListing);
router.route("/:id").get(getListingById);
router.route("/:id/edit").get(editListing);
router.route("/:id").put(updateListing);
router.route("/:id").delete(deleteListing);
export default router;
