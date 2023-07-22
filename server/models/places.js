import mongoose, { Schema } from "mongoose";

const PlacesSchema = new Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  title: String,
  address: String,
  photos: [String],
  description: String,
  perks: [String],
  extraInfo: String,
  checkIn: String,
  checkOut: String,
  maxGuests: Number,
  price: String,
});

export const PlacesModel = mongoose.model("Place", PlacesSchema);
