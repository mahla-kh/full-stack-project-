import express from "express";
import Like from "../models/like.js";
import User from "../models/user.js";
import Product from "../models/product.js";
import { auth } from "../middleware/auth.js";

export const router = new express.Router();

router.get("/userlikes", auth, async (req, res) => {
  try {
    const userLikes = await Like.find({ userId: req.user._id });
    if (!userLikes) res.send([]);
    res.send(userLikes);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
});

router.get("/alllikes", async (req, res) => {
  try {
    const allLikes = await Like.find({});
    if (!allLikes) throw new Error("no like found !");
    res.send(allLikes);
  } catch (err) {
    console.log(err);
    res.status(400), send(err);
  }
});

router.post("/addlike", auth, async (req, res) => {
  console.log(req.body);
  try {
    const userValidation = await User.findById(req.body.userId);
    const productValidation = await Product.findById(req.body.productId);
    if (!userValidation || !productValidation) {
      console.log("user or product invalid");
      throw new Error("user or product invalid");
    }
    const newLike = new Like(req.body);
    await newLike.save();
    res.send(newLike);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
});

router.delete("/removelike", auth, async (req, res) => {
  try {
    const userValidation = await User.findById(req.body.userId);
    const productValidation = await Product.findById(req.body.productId);
    if (!userValidation || !productValidation)
      throw new Error("user or product invalid");
    const deletedLike = await Like.findOneAndDelete({
      userId: req.userId,
      productId: req.productId,
    });
    // await Like.save();
    res.send(deletedLike);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
});
