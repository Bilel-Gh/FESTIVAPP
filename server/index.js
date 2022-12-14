import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import AuthRoute from "./Routes/AuthRoute.js";
import UserRoute from "./Routes/UserRoute.js";
import PostRoute from "./Routes/PostRoute.js";
import UploadRoute from "./Routes/UploadRoute.js";
import path from "path";

// ───────────────────────────────────────ROUTES─────────────────────────────────────────

const app = express();

// pour permettre l'accès au images
app.use(express.static('public'));
app.use('/images', express.static("images"));

// ────────────────────────────────────────MIDDLEWARE────────────────────────────────────────

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

dotenv.config();

mongoose
  .connect(process.env.MONGO_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(process.env.PORT || 5000, () =>
      console.log(`Server started on port ${process.env.PORT}`)
    )
  )
  .catch((err) => console.log(err));

//   ───────────────────────────────────────UTILISATION DES ROUTES─────────────────────────────────────────

app.use("/auth", AuthRoute);
app.use("/user", UserRoute);
app.use("/post", PostRoute);
app.use("/upload", UploadRoute);

// ────────────────────────────────────────PRODUCTION───────────────────────────────────────────────────────

// const __dirname = path.resolve();
// console.log(__dirname);

// if (process.env.NODE_ENV === "production") {

//   app.use(express.static("../client/build"));

//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
//   }
//   )
// } else {
//   app.get("/", (req, res) => {
//     res.send("API is running..");
//   });
// }