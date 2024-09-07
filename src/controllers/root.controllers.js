import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const notFoundHandler = asyncHandler(async (req, res, next) => {
  next(new ApiError(404, "Page Not Found!"));
});

export { notFoundHandler };
