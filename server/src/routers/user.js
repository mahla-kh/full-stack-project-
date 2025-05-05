import express from "express";
import User from "../models/user.js";
import { auth } from "../middleware/auth.js";
export const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    const user = new User(req.body);
    const token = await user.generateToken();
    await user.save();
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
    res.send({ user, token });
  } catch (err) {
    console.log("login error :", err);
    res.status(400).send({ message: err });
    // res.status(400).send({ message: err.toObject() });
  }
});

router.get("/profile", auth, async (req, res) => {
  try {
    res.send(req.user);
  } catch (err) {
    console.log(err);
    res.status(400).send({ message: err });
  }
});

router.patch("/userUpdate", auth, async (req, res) => {
  // if (!req.user._id === req.params.id)
  //   throw new Error("user is not authenticated");
  // console.log("patch : ", req.body);
  const updates = Object.keys(req.body);
  const allowedUpdates = [
    "username",
    "createdAt",
    "__v",
    "email",
    "updatedAt",
    // "liked",
    // "saved",
    "phoneNumber",
  ];
  const isValidOperation = updates.every(
    (update) => update === "_id" || allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send("invalid updates");
  }
  try {
    updates
      .filter((update) => update !== "_id")
      .forEach((update) => (req.user[update] = req.body[update]));
    await req.user.save();
    // res.send(req.user.toObject());
    res.send(req.user);
  } catch (err) {
    console.log("update ", err.toObject());
    res.status(400).send(err);
  }
});
