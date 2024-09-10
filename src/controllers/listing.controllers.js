import mongoose from "mongoose";
import { Listing } from "../models/listing.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";


// Show All Listing
const allListings = asyncHandler(async (req, res) => {
  const listings = await Listing.find({}).sort({ createdAt: -1 });
  if (!listings) {
    throw new ApiError(500, "Something went wrong while adding listing!");
  }
  res.render("listings/index.ejs", { listings });
});

// Show Single Listing By ID
const getListingById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!id) {
    throw new ApiError(401, "Id not found in url");
  }
  const listing = await Listing.findById(id).populate({
    path: "reviews",
    options: { sort: { createdAt: -1 } },
  }).populate("owner");
  if (!listing) {
    req.flash("failure", "Listing Does Not Exists!");
    res.redirect("/listing");
  }

  res.render("listings/show.ejs", { listing });
});

// Add New Listing Form
const addNewListing = asyncHandler(async (req, res) => {
  res.render("listings/new.ejs");
});

// Create Listing Controller
const createListing = asyncHandler(async (req, res) => {
  const { title, description, price, image, location, country } = req.body;
  if (
    [title, description, price, image, location, country].some(
      (field) => field?.trim() === ""
    )
  ) {
    throw new ApiError(400, "All fields are required");
  }
  const listing = await Listing.create({
    title,
    description,
    image,
    price,
    location,
    country,
    owner : req.user._id
  });

  const createdListing = await Listing.findById(listing._id);
  if (!createListing) {
    throw new ApiError(500, "Something went wrong while adding listing");
  }
  req.flash("success", "New Listing Created Successfully!");
  res.redirect("/listing");
});

// Edit Listing Form
const editListing = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!id) {
    throw new ApiError(401, "Id not found in url");
  }
  const listing = await Listing.findById(id);
  if (!listing) {
    req.flash("failure", "Listing Does Not Exists!");
    res.redirect("/listing");
  }

  res.render("listings/edit.ejs", { listing });
});

// Update Listing Controller
const updateListing = asyncHandler(async (req, res) => {
  const { title, description, price, image, location, country } = req.body;
  if (
    [title, description, price, image, location, country].some(
      (field) => field?.trim() === ""
    )
  ) {
    throw new ApiError(400, "All fields are required");
  }
  const { id } = req.params;
  if (!id) {
    throw new ApiError(400, "ID not found in params");
  }
  const listing = await Listing.findByIdAndUpdate(id, {
    title,
    description,
    price,
    image,
    location,
    country,
  });

  const updatedListing = await Listing.findById(listing._id);
  if (!updatedListing) {
    throw new ApiError(500, "Something went wrong while updating listing");
  }

  req.flash("success", "Listing Updated Successfully!");
  res.redirect(`/listing/${id}`);
});

// Delete Listing Controller
const deleteListing = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const deletedListing = await Listing.findByIdAndDelete(id);

  req.flash("failure", "Listing Deleted!");
  res.redirect("/listing");
});

export {
  createListing,
  allListings,
  getListingById,
  addNewListing,
  editListing,
  updateListing,
  deleteListing,
};
