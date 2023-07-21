import { PlacesModel } from "../models/places.js";
import jwt from "jsonwebtoken";

export const addPlace = async (req, res) => {
  const { token } = req.cookies;
  const allData = req.body;
  try {
    if (token) {
      const jwtSecret = "fasefraw4r5r3wq45wdfgw34twdfg";
      jwt.verify(token, jwtSecret, {}, async (err, user) => {
        if (err) throw err;
        const placeDoc = await PlacesModel.create({
          ...allData,
          owner: user.id,
        });
        res.json(placeDoc);
      });
    }
  } catch (error) {
    res.json(error);
  }
};
