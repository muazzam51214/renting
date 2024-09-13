import { app } from "./app.js";
import connectDB from "./db/index.js";

const port = process.env.PORT;

connectDB()
  .then(() => {
    app.on("error", () => {
      console.log("Error : ", error);
      throw error;
    });
    app.listen(port, () => {
      console.log(`App is listening on port ${port}`);
    });
  })
  .catch((error) => {
    console.log("MongoDB Connection Failed!", error);
  });
