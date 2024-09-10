import { Router } from "express";
import {
  registerUser,
  signupUser,
  loginUserForm,
  loginUserController,
  logoutUser,
} from "../controllers/user.controllers.js";
import { isLoggedIn } from "../middlewares/isLoggedIn.middleware.js";

const router = Router();

router.route("/signup").get(signupUser).post(registerUser);

router.route("/login").get(loginUserForm).post(loginUserController);

router.route("/logout").get(isLoggedIn, logoutUser);

export default router;
