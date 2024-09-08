import mongoose, { Schema } from "mongoose";

const reviewSchema = new Schema(
  {
    comment: {
      type: String,
      required: [true, "Comment is required"],
    },
    rating: {
      type: Number,
      min:1,
      max: 5,
    },
  },
  { timestamps: true }
);

export const Review = mongoose.model("Review", reviewSchema);
