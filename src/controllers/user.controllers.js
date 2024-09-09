import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import passport from "passport";

const signupUser = asyncHandler(async (req, res) => {
  res.render("user/signup.ejs");
});

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const newUser = { username, email };

    const registerUser = await User.register(newUser, password);

    const createdUser = await User.findById(registerUser._id);
    if (!createdUser) {
      throw new ApiError(500, "Something went wrong while adding listing");
    }
    req.flash("success", `Welcome ${createdUser.username}`);
    res.redirect("/listing");
  } catch (error) {
    req.flash("failure", error.message);
    res.redirect("/signup");
  }
});

const loginUserForm = asyncHandler(async (req, res) => {
  res.render("user/login.ejs");
});

const loginUser = asyncHandler(async (req, res) => {
  
  req.flash("success", `Welcome! You are loggedIn`);
  res.redirect("/listing");
});

const authCallback = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
      if (err) {
          return next(err); // Handle errors
      }
      if (!user) {
          req.flash('failure', info.message); // Flash the failure message
          return res.redirect('/login'); // Redirect to login with failure
      }
      req.logIn(user, (err) => {
          if (err) {
              return next(err); // Handle errors during login
          }
          return res.redirect('/listing'); // Redirect to desired page
      });
  })(req, res, next);
};




export { signupUser, registerUser, loginUserForm, loginUser, authCallback };
