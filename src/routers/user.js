import express from "express";
import { User } from "../models/user.js";
import { auth } from "../middleware/auth.js";
import multer from "multer";
import sharp from "sharp";
import mongoose from "mongoose";

export const router = express.Router();
router.post("/users", async (req, res) => {
  try {
    const user = new User(req.body);
    const token = await user.generateAuthTokens();
    await user.save();
    console.log("saving user", user);
    res.send({ user, token });
  } catch (err) {
    // console.log("got errorr", err);
    res.status(400).send(err);
  }
});

router.get("/users", async (req, res) => {
  try {
    const result = await User.find({});
    res.status(200).send(result);
  } catch (err) {
    res.status(400).send(err);
  }
});
router.post("/users/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(
      (token) => token.token !== req.token
    );
    await req.user.save();
    res.send();
  } catch (err) {
    res.send(err);
  }
});

router.post("/users/logoutAll", auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send();
  } catch (err) {
    res.status(400).send();
  }
});
router.get("/users/me", auth, async (req, res) => {
  res.send(req.user);
});
router.get("/users/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    const user = await User.findById(_id);
    if (!user) res.status(404).send();
    res.send(user);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.post("/users/login", async (req, res) => {
  console.log(req.body);
  try {
    const user = await User.findByInfo(req.body.email, req.body.password);
    const token = await user.generateAuthTokens();
    res.send({ user, token });
  } catch (err) {
    // console.log(err);
    res.status(401).send();
  }
});

router.patch("/users/me", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "email", "age", "password"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) return res.status(400).send("invalid updates");
  try {
    updates.forEach((update) => (req.user[update] = req.body[update]));
    await req.user.save();
    res.send(req.user);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.delete("/users/me", auth, async (req, res) => {
  // console.log(req.user);
  // console.log(
  //   "req.user instanceof mongoose.Model:",
  //   req.user instanceof mongoose.Model
  // );

  try {
    await req.user.deleteOne();
    // await req.user.remove();
    res.send();
  } catch (e) {
    console.log("del err", e);
    res.status(500).send();
  }
});

router.get("/users/:id/avatar", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user.avatar || !user) throw new Error();
    res.set("Content-Type", "image/png");
    res.send(user.avatar);
  } catch (err) {
    res.status(400).send();
  }
});

const upload = multer({
  // dest: "avatar",
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg|jpeg)$/)) {
      return cb(new Error("file format invalid"));
    }
    cb(undefined, true);
  },
});
router.post(
  "/users/me/avatar",
  auth,
  upload.single("avatar"),
  async (req, res) => {
    const buffer = await sharp(req.file.buffer)
      .resize(250, 250)
      .toFormat("png")
      .toBuffer();
    req.user.avatar = buffer;
    await req.user.save();
    res.send();
  },
  (err, req, res, next) => {
    res.status(400).send({ error: err.message });
    next();
  }
);
