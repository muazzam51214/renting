import { asyncHandler } from "../utils/asyncHandler.js";

export const isLoggedIn = asyncHandler(async (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    if (req.originalUrl) {
      req.session.returnTo = req.originalUrl;
    }
  
    req.flash("failure", "Please Login First");
    res.redirect("/login");
  }
});
