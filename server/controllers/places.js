import { PlacesModel } from "../models/places.js";
import jwt from "jsonwebtoken";

export const addPlace = async (req, res) => {
  const { token } = req.cookies;
  const allData = req.body;
  console.log(allData);
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

export const getUserPlaces = async (req, res) => {
  const { token } = req.cookies;

  try {
    if (token) {
      const jwtSecret = "fasefraw4r5r3wq45wdfgw34twdfg";
      jwt.verify(token, jwtSecret, {}, async (err, user) => {
        if (err) throw err;
        const { id } = user;
        res.json(await PlacesModel.find({ owner: id }));
      });
    }
  } catch (error) {
    res.json(error);
  }
};

export const getPlace = async (req, res) => {
  const { id: _id } = req.params;

  try {
    const placeDoc = await PlacesModel.findById({ _id });
    res.json(placeDoc);
  } catch (error) {
    res.json(error);
  }
};

export const getPlaces = async (req, res) => {
  res.json(await PlacesModel.find());
};

export const getSinglePlace = async (req, res) => {
  const { id } = req.params;
  res.json(await PlacesModel.findById(id));
};

export const updatePlace = async (req, res) => {
  const { id, ...rest } = req.body;
  const { token } = req.cookies;

  try {
    if (token) {
      const jwtSecret = "fasefraw4r5r3wq45wdfgw34twdfg";
      const place = await PlacesModel.findById(id);
      jwt.verify(token, jwtSecret, {}, async (err, user) => {
        if (err) throw err;
        if (user.id === place.owner.toString()) {
          await PlacesModel.findByIdAndUpdate(id, rest);
          // place.set({ rest });
          // await place.save();
          res.json("ok");
        }
      });
    }
  } catch (error) {
    res.json(error);
  }
};
