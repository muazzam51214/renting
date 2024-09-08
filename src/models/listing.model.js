import mongoose, { Schema } from "mongoose";
import { Review } from "./review.model.js";

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
    reviews: [
      {
        type: Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
  },
  { timestamps: true }
);

listingSchema.post("findOneAndDelete", async (listing) => {
  if(listing){
    await Review.deleteMany({ _id: { $in: listing.reviews } });
  }
});
export const Listing = mongoose.model("Listing", listingSchema);
