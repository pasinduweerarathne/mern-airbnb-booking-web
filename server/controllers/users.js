import { UserModel } from "../models/users.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

export const signup = async (req, res) => {
  const { name, email, password } = req.body;
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);
  mongoose.connect(process.env.MONGODB_URI);

  try {
    const existingUser = await UserModel.findOne({ email });

    if (!existingUser) {
      const newUser = await UserModel.create({
        name,
        email,
        password: hashedPassword,
      });
      res.json(newUser);
    } else {
      res.status(400).json("emaila alredy used");
    }
  } catch (error) {
    res.json(error);
  }
};

export const signin = async (req, res) => {
  const { email, password } = req.body;
  mongoose.connect(process.env.MONGODB_URI);

  try {
    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      const isPwdCorrect = bcrypt.compareSync(password, existingUser.password);
      if (isPwdCorrect) {
        const jwtSecret = "fasefraw4r5r3wq45wdfgw34twdfg";
        jwt.sign(
          { email: existingUser.email, id: existingUser._id },
          jwtSecret,
          {},
          (err, token) => {
            if (err) throw err;
            res.cookie("token", token).json(existingUser);
          }
        );
      } else {
        res.status(404).json("invalid credentions");
      }
    } else {
      res.status(404).json("not found");
    }
  } catch (error) {
    res.json(error);
  }
};

export const profile = async (req, res) => {
  const { token } = req.cookies;
  mongoose.connect(process.env.MONGODB_URI);

  if (token) {
    const jwtSecret = "fasefraw4r5r3wq45wdfgw34twdfg";
    jwt.verify(token, jwtSecret, {}, async (err, user) => {
      if (err) throw err;
      const { email, name, _id } = await UserModel.findById(user.id);
      res.json({ email, name, _id });
    });
  }
};

export const logout = async (req, res) => {
  res.cookie("token", "").json(true);
};
