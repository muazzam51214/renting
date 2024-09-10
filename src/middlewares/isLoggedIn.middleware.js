import { asyncHandler } from "../utils/asyncHandler.js";

export const isLoggedIn = asyncHandler(async (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    if (!(req.originalUrl && req.originalUrl.includes("?"))) {
      req.session.returnTo = req.originalUrl;
    }else{
      req.session.returnTo = req.originalUrl.split("?")[0];
    }
  
    req.flash("failure", "Please Login First");
    res.redirect("/login");
  }
});

export const isLoggedInForReview = asyncHandler( async (req, res, next) => {
  const {id} = req.params;
  if (req.isAuthenticated()) {
    next();
  } else {
    if (req.originalUrl) {
      req.session.returnTo = `/listing/${id}`;
    }
    req.flash("failure", "Please Login First");
    res.redirect("/login");
  }
})
