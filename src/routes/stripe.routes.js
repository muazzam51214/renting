import { Router } from "express";
import { makePaymentForm, createCheckoutSession, successRedirect, failedRedirect  } from "../controllers/stripe.controllers.js";
import { isLoggedIn } from "../middlewares/isLoggedIn.middleware.js";

const router = Router();

router.route("/").get(makePaymentForm);
router.route("/success").get(successRedirect);
router.route("/failed").get(failedRedirect);

router.route("/create-checkout-session").post(createCheckoutSession);

export default router;
