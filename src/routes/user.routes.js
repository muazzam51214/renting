import { Router } from "express";
import { registerUser, signupUser, loginUserForm, loginUser, authCallback } from "../controllers/user.controllers.js";
import passport from "passport";

const router = Router();

router.route("/signup")
    .get(signupUser)
    .post(registerUser);

router.route("/login")
    .get(loginUserForm)
    .post( authCallback);

export default router;
