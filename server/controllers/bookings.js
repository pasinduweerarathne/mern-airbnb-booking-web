import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { BookingModel } from "../models/bookings.js";

const jwtSecret = "fasefraw4r5r3wq45wdfgw34twdfg";

const getUserDataFromReq = (req) => {
  return new Promise((resolve, reject) => {
    jwt.verify(req.cookies.token, jwtSecret, {}, (err, user) => {
      if (err) throw err;
      resolve(user);
    });
  });
};

export const bookingPlace = async (req, res) => {
  const bookingData = req.body;

  const { id } = await getUserDataFromReq(req);

  try {
    mongoose.connect(process.env.MONGODB_URI);
    const booking = await BookingModel.create({ ...bookingData, user: id });
    res.json(booking);
  } catch (error) {
    res.json(error);
  }
};

export const getUserBookedPlaces = async (req, res) => {
  mongoose.connect(process.env.MONGODB_URI);
  const { id } = await getUserDataFromReq(req);
  res.json(await BookingModel.find({ user: id }).populate("place"));
};
