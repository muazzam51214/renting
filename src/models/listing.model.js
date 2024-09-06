import mongoose, { Schema } from "mongoose";

const listingSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    description: {
      type: String,
    },
    image: {
      type: String,
      required: [true, "Image is required"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
    },
    location: {
      type: String,
      required: [true, "Location is required"],
    },
    country: {
      type: String,
      enum: ["pakistan", "india", "usa", "china", "bangladesh", "iran", "iraq"],
      default: "pakistan",
    },
  },
  { timestamps: true }
);

export const Listing = mongoose.model("Listing", listingSchema);
