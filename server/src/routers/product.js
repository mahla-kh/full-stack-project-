import express from "express";
import { auth } from "../middleware/auth.js";
import multer from "multer";
import sharp from "sharp";
import Product from "../models/product.js";
import mongoose from "mongoose";

export const router = express.Router();

router.get("/products", async (req, res) => {
  try {
    const products = await Product.find({});
    if (!products) throw new Error("no product found");
    res.send(products);
  } catch (err) {
    console.log(err);
    res.status(400).send();
  }
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

router.post("/addproduct", auth, upload.array("pics", 5), async (req, res) => {
  try {
    const { title, desc, category, price } = req.body;

    const processedPics = [];
    for (const file of req.files) {
      const buffer = await sharp(file.buffer)
        .resize(500, 500)
        .toFormat("png")
        .toBuffer();

      processedPics.push({
        _id: new mongoose.Types.ObjectId(),
        buffer,
      });
    }
    const product = new Product({
      title,
      desc,
      category,
      price,
      pictures: processedPics,
    });

    await product.save();
    res.send(product);
  } catch (err) {
    console.log(err);
    res.status(400).send("couldent add product!");
  }
});

router.get("/products/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) throw new Error("product not found");
    // res.set("Content-Type", "image/png");
    // const buffers = product.pictures.map((pic) => pic.buffer);
    // res.send(buffers);
    res.send(product);
  } catch (err) {
    console.log(err);
    res.status(400).send({ error: err });
  }
});
