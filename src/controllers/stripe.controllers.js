import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const makePaymentForm = asyncHandler(async (req, res) => {
  res.render("payment/index.ejs");
});

const successRedirect = asyncHandler(async (req, res) => {
  res.render("payment/success.ejs");
});

const failedRedirect = asyncHandler(async (req, res) => {
  res.render("payment/failed.ejs");
});

const createCheckoutSession = asyncHandler(async (req, res) => {
  const { productName, amount } = req.body;
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "pkr",
          product_data: {
            name: productName,
          },
          unit_amount: amount * 100,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: "https://renting-production.up.railway.app/payment/success",
    cancel_url: "https://renting-production.up.railway.app/payment/failed",
  });

  res.json({ id: session.id });
});

export {
  makePaymentForm,
  createCheckoutSession,
  successRedirect,
  failedRedirect,
};
