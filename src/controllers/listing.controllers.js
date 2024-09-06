import mongoose from "mongoose";
import { Listing } from "../models/listing.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

const allListings = asyncHandler(async (req, res) => {
  const listings = await Listing.find({});
  if (!listings) {
    throw new ApiError(500, "Something went wrong while adding listing!");
  }
  res.render("listings/index.ejs", { listings });
});

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

const addNewListing = asyncHandler(async (req, res) => {
  res.render("listings/new.ejs");
});

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

  res.redirect("/listing")
});

export { createListing, allListings, getListingById, addNewListing };
