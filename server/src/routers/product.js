import express from "express";
import { auth } from "../middleware/auth.js";
import multer from "multer";
import sharp from "sharp";
import Product from "../models/product.js";
import mongoose from "mongoose";

export const router = express.Router();

router.post("/addproduct", auth, async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.send(product);
  } catch (err) {
    console.log(err);
    res.status(400).send("couldent add product!");
  }
  // const productKeys = Object.keys(req.body);
  // const options = ["title", "desc", "price", "pictures"];
  // const verified = productKeys.every((key) => options.includs(key));
  // if (!verified) throw new Error("invalid inputs");
});

const upload = multer({
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
  "/product/:id/pics",
  auth,
  upload.array("pics", 5),
  async (req, res) => {
    const processedPics = [];
    for (const file of req.files) {
      const buffer = await sharp(file.buffer)
        .resize(1000, 1000)
        .toFormat("png")
        .toBuffer();

      processedPics.push({
        _id: new mongoose.Types.ObjectId(),
        buffer,
      });
    }
    const product = await Product.findById(req.params.id);
    if (!product) throw new Error("محصول مورد نظر پیدا نشد !");
    console.log(processedPics);
    product.pictures = processedPics;
    await product.save();
    res.send(product);
  }
);

router.get("/product/:id/pics", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product || !product.pictures) throw new Error("product not found");
    res.set("Content-Type", "image/png");
    const buffers = product.pictures.map((pic) => pic.buffer);
    res.send(buffers);
  } catch (err) {
    console.log(err);
    res.status(400).send({ error: err });
  }
});
