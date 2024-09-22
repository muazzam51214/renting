import express from "express";
import methodOverRide from "method-override";
import ejsMate from "ejs-mate";
import path from "path";
import { fileURLToPath } from "url";
import session from "express-session";
import MongoStore from "connect-mongo";
import flash from "connect-flash";
import passport from "passport";
import LocalStrategy from "passport-local";
import { User } from "./models/user.model.js";
import { DB_NAME } from "./constants.js";



const app = express();
// Setting View Engine
app.set("view engine", "ejs");
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.set("views", path.join(__dirname, "views"));
app.engine("ejs", ejsMate);

app.use(methodOverRide("_method"));
app.use(express.static("public"));
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

//  MongoDB Session Store
const store = MongoStore.create({
  mongoUrl: `${process.env.MONGODB_URI}/${DB_NAME}`,
  crypto : {
    secret : process.env.ACCESS_TOKEN_SECRET
  },
  touchAfter : 24 * 60 * 60
});

store.on("error", (error) => {
  console.log("Error in Mongo Session Store", error);
})

// Setting Express Sesssion
const sessionOptions = {
  store,
  secret: process.env.ACCESS_TOKEN_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
};


app.use(session(sessionOptions));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.failure = req.flash("failure");
  res.locals.currentUser = req.user;
  next();
});

// Routes Import
import userRouter from "./routes/user.routes.js";
import listingRouter from "./routes/listing.routes.js";
import reviewRouter from "./routes/review.routes.js";
import { notFoundHandler } from "./controllers/root.controllers.js";
import stripeRouter from "./routes/stripe.routes.js";

// Routes Declaration
app.use("/listing", listingRouter);
app.use("/review", reviewRouter);
app.use("/", userRouter);
app.use("/payment", stripeRouter);


app.all("*", notFoundHandler);
app.use((err, req, res, next) => {
  let { statusCode = 500, message = "something went wrong" } = err;
  // res.status(statusCode).send(message);
  res.render("error/error.ejs", { message });
});

export { app };
