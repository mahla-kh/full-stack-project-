import express from "express";
import User from "../models/user.js";
import { auth } from "../middleware/auth.js";
export const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    const user = new User(req.body);
    console.log("before token ", user);
    const token = await user.generateToken();
    console.log("before save ", user);
    await user.save();
    console.log("after save ", user);
    res.send({ user, token });
  } catch (err) {
    console.log("error", err);
    res.status(400).send({ error: err });
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findByInfo(req.body.email, req.body.password);
    const token = await user.generateToken();
    await user.save();
    res.send({ user: user.toObject(), token });
  } catch (err) {
    console.log("login error :", err);
    res.status(400).send({ message: err.toObject() });
  }
});

router.get("/profile", auth, async (req, res) => {
  try {
    console.log(req.user);
    res.send(req.user.toObject());
  } catch (err) {
    console.log(err);
    res.status(400).send({ message: err });
  }
});
