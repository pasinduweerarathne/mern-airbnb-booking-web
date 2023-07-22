import express from "express";
import { bookingPlace, getUserBookedPlaces } from "../controllers/bookings.js";

const router = express.Router();

router.post("/bookingplace", bookingPlace);
router.get("/getbookedplaces", getUserBookedPlaces);

export default router;
