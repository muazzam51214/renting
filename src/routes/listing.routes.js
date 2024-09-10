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


const router = Router();

router.route("/").get(allListings).post(createListing);

router.route("/new").get(isLoggedIn, addNewListing);
router.route("/:id").get(getListingById);
router.route("/:id/edit").get(isLoggedIn, editListing);
router.route("/:id").put(isLoggedIn, updateListing);
router.route("/:id").delete(isLoggedIn, deleteListing);

export default router;
