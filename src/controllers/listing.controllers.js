import mongoose from "mongoose";
import { Listing } from "../models/listing.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";


// Show All Listing
const allListings = asyncHandler(async (req, res) => {
  const listings = await Listing.find({});
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
  const listing = await Listing.findById(id);
  if (!listing) {
    throw new ApiError(400, "Listing not found!");
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
  const listing = await Listing.create({
    title,
    description,
    image,
    price,
    location,
    country,
  });

  const createdListing = await Listing.findById(listing._id);
  if (!createListing) {
    throw new ApiError(500, "Something went wrong while adding listing");
  }

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
    throw new ApiError(400, "Listing not found!");
  }

  res.render("listings/edit.ejs", { listing });
});

// Update Listing Controller
const updateListing = asyncHandler(async (req, res) => {
  const { title, description, price, image, location, country } = req.body;
  const { id } = req.params;
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

  res.redirect(`/listing/${id}`);
});

export {
  createListing,
  allListings,
  getListingById,
  addNewListing,
  editListing,
  updateListing,
};
