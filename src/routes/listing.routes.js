import { Router } from "express";
import {
  allListings,
  getListingById,
  addNewListing,
  createListing,
  editListing,
  updateListing,
  deleteListing,
} from "../controllers/listing.controllers.js";
import { isLoggedIn } from "../middlewares/isLoggedIn.middleware.js";
import { isOwnerForListing } from "../middlewares/isOwner.middleware.js";


const router = Router();

router.route("/").get(allListings).post(createListing);

router.route("/new").get(isLoggedIn, addNewListing);
router.route("/:id").get(getListingById);
router.route("/:id/edit").get(isLoggedIn, isOwnerForListing, editListing);
router.route("/:id").put(isLoggedIn, isOwnerForListing, updateListing);
router.route("/:id").delete(isLoggedIn, isOwnerForListing, deleteListing);

export default router;
