import mongoose from "mongoose";
import { Listing } from "../models/listing.model.js";
import { Review } from "../models/review.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";

//  Add Review
const addReview = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!id) {
    throw new ApiError(400, "ID not found in params");
  }

  const { comment, rating } = req.body;
  if (!(comment || rating)) {
    throw new ApiError(400, "Both Review Content & Rating are required");
  }

  const newReview = await Review.create({
    comment,
    rating,
    owner : req.user._id
  });

  const createdReview = await Review.findById(newReview._id);
  if (!createdReview) {
    throw new ApiError(500, "Something went wrong while adding Review");
  }

  const listing = await Listing.findById(id);
  listing.reviews.push(createdReview);
  await listing.save();
  req.flash("success", "New Review Added Successfully!");
  res.redirect(`/listing/${id}`);
});

const deleteReview = asyncHandler(async (req, res) => {
  const { id, reviewId } = req.params;
  await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  await Review.findByIdAndDelete(reviewId);
  req.flash("failure", "Review Deleted!");
  res.redirect(`/listing/${id}`);
});

export {
  addReview,
  deleteReview
}