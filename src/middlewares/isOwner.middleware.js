import { asyncHandler } from "../utils/asyncHandler.js";
import { Listing } from "../models/listing.model.js";
import { Review } from "../models/review.model.js";

export const isOwnerForListing = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);
  if (listing && listing.owner._id === req.user._id) {
    return next();
  }

  req.flash("failure", "You dont have permission!");
  res.redirect(`/listing/${id}`);
});

export const isOwnerForReview = asyncHandler(async (req, res, next) => {
  const { id, reviewId } = req.params;
  const review = await Review.findById(reviewId);
  if (review.owner.equals(req.user._id)) {
    return next();
  }

  req.flash("failure", "You dont have permission!");
  res.redirect(`/listing/${id}`);
});
