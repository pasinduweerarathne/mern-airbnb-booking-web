import mongoose, { Schema } from "mongoose";

const BookingSchema = new Schema({
  place: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Place" },
  user: { type: mongoose.Schema.Types.ObjectId, required: true },
  checkIn: { type: String, required: true },
  checkOut: { type: String, required: true },
  numberOfGuests: { type: String, required: true },
  name: { type: String, required: true },
  phone: { type: String, required: true },
  price: Number,
});

export const BookingModel = mongoose.model("Booking", BookingSchema);
