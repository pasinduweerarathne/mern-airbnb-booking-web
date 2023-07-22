import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import { fileURLToPath } from "url";
import path from "path";

import userRouter from "./routes/users.js";
import placeRouter from "./routes/places.js";
import bookingRouter from "./routes/bookings.js";
import fileuploadRouter from "./routes/fileupload.js";

const app = express();
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(__dirname + "/uploads"));
app.use(
  cors({
    origin: ["http://localhost:5000"],
    credentials: true,
  })
);

app.use("/user", userRouter);
app.use("/file", fileuploadRouter);
app.use("/place", placeRouter);
app.use("/booking", bookingRouter);

app.listen(5000);
