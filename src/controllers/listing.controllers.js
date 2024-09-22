import mongoose from "mongoose";
import { Listing } from "../models/listing.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

// Show All Listing
const allListings = asyncHandler(async (req, res) => {
  const listings = await Listing.find({}).sort({ createdAt: -1 });
  if (!listings) {
    throw new ApiError(500, "Something went wrong while adding listing!");
  }
  res.render("listings/index.ejs", {
    listings,
    title1: "All Listings",
    title2: "All Listings in One Place!",
  });
});

// Show Single Listing By ID
const getListingById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!id) {
    throw new ApiError(401, "Id not found in url");
  }
  const listing = await Listing.findById(id)
    .populate({
      path: "reviews",
      options: { sort: { createdAt: -1 } },
      populate: {
        path: "owner",
      },
    })
    .populate("owner");
  if (!listing) {
    req.flash("failure", "Listing Does Not Exists!");
    res.redirect("/listing");
  }

  res.render("listings/show.ejs", {
    listing,
    key: process.env.STRIPE_PUBLISHABLE_KEY,
  });
});

// Add New Listing Form
const addNewListing = asyncHandler(async (req, res) => {
  res.render("listings/new.ejs");
});

// Create Listing Controller
const createListing = asyncHandler(async (req, res) => {
  const { title, description, price, location, country } = req.body;
  if (
    [title, description, price, location, country].some(
      (field) => field?.trim() === ""
    )
  ) {
    req.flash("failure", "All fields are required!");
    res.redirect("/listing/new");
  }
  const imageLocalPath = req.file?.path;

  if (!imageLocalPath) {
    req.flash("failure", "Listing Image is required");
    res.redirect("/listing/new/");
  }

  const listingImage = await uploadOnCloudinary(imageLocalPath);

  if (!listingImage) {
    req.flash("failure", "Listing Image is required");
    res.redirect("/listing/new/");
  }

  const listing = await Listing.create({
    title,
    description,
    image: listingImage.url,
    price,
    location,
    country,
    owner: req.user._id,
  });

  const createdListing = await Listing.findById(listing._id);
  if (!createListing) {
    req.flash("failure", "Something went wrong while adding listing");
    res.redirect("/listing/new");
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
  const { title, description, price, location, country } = req.body;
  if (
    [title, description, price, location, country].some(
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
    location,
    country,
  });

  const updatedListing = await Listing.findById(listing._id);
  if (!updatedListing) {
    throw new ApiError(500, "Something went wrong while updating listing");
  }

  if (req.file) {
    const imageLocalPath = req.file?.path;
    if (!imageLocalPath) {
      req.flash("failure", "Listing Image is required");
      res.redirect(`/listing/${id}/edit`);
    }

    const listingImage = await uploadOnCloudinary(imageLocalPath);

    if (!listingImage) {
      req.flash("failure", "Listing Image is required");
      res.redirect(`/listing/${id}/edit`);
    }

    updatedListing.image = listingImage.url;
    await updatedListing.save();
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

const myListings = asyncHandler(async (req, res) => {
  const listings = await Listing.find({ owner: req.user._id }).sort({
    createdAt: -1,
  });
  if (!listings) {
    throw new ApiError(500, "Something went wrong while adding listing!");
  }
  res.render("listings/index.ejs", {
    listings,
    title1: "My Lisitngs",
    title2: `${
      req.user.username.charAt(0).toUpperCase() + req.user.username.slice(1)
    }'s Listings`,
  });
});

export {
  createListing,
  allListings,
  getListingById,
  addNewListing,
  editListing,
  updateListing,
  deleteListing,
  myListings,
};
