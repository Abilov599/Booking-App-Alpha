import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import { RoomRoute } from "./routes/Room.js";
import { UserRoute } from "./routes/User.js";
import { BookingsRoute } from "./routes/Booking.js";

//App config
const app = express();
app.use(cookieParser());
app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ limit: "25mb", extended: true }));
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
dotenv.config();
mongoose.set("strictQuery", false);
import multer from "multer";

//Routes
app.use("/api", RoomRoute);
app.use("/api", UserRoute);
app.use("/api", BookingsRoute);

const PORT = process.env.PORT || 3000;
const DB = process.env.DB_URL.replace("<password>", process.env.PASSWORD);

/// Multer Storage

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __dirname + "/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const Data = multer({ storage: storage });

app.post("/files", Data.any("files"), (req, res) => {
  if (res.status(200)) {
    console.log("Your file has been uploaded successfully.");
    console.log(req.files);
    res.json({ message: "Successfully uploaded files" });
    res.end();
  }
});

// Connect MongoDB
mongoose.connect(
  DB,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (!err) {
      console.log("MongoDB Connection Succeeded.");
    } else {
      console.log("Error in DB connection: " + err);
    }
  },
  app.listen(PORT)
);
