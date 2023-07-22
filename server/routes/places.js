import express from "express";
import {
  addPlace,
  getPlace,
  getPlaces,
  getUserPlaces,
  updatePlace,
  getSinglePlace,
} from "../controllers/places.js";

const router = express.Router();

router.post("/addplace", addPlace);
router.get("/user-getplaces", getUserPlaces);
router.get("/getplaces", getPlaces);
router.put("/updateplace", updatePlace);
router.get("/single-place/:id", getSinglePlace);
router.get("/getplace/:id", getPlace);

export default router;
