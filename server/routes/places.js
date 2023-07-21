import express from "express";
import { addPlace } from "../controllers/places.js";

const router = express.Router();

router.post("/addplace", addPlace);

export default router;
