import express from "express";
import methodOverRide from "method-override"
import path from 'path';
import { fileURLToPath } from 'url';
const app = express();
// Setting View Engine
app.set("view engine", "ejs");
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.set("views", path.join(__dirname, "views"));

app.use(methodOverRide("_method"))
app.use(express.static("public"));
app.use(express.json({limit: "16kb"}));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

// Routes Import
import userRouter from "./routes/user.routes.js";
import listingRouter from "./routes/listing.routes.js";

// Routes Declaration
app.use("/users", userRouter);
app.use("/listing", listingRouter);

export { app }