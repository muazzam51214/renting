import { asyncHandler } from "../utils/asyncHandler.js";
import { Listing } from "../models/listing.model.js";

export const isOwner = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);
  if (listing && listing.owner._id === req.user._id) {
    return next();
  }

  req.flash("failure", "You dont have permission!");
  res.redirect(`/listing/${id}`);
});
