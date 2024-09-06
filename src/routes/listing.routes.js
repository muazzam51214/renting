import { Router } from "express";
import {
  allListings,
  getListingById,
  addNewListing,
  createListing,
} from "../controllers/listing.controllers.js";

const router = Router();

router.route("/")
  .get(allListings)
  .post(createListing);
  
router.route("/new").get(addNewListing);
router.route("/:id").get(getListingById);

export default router;
