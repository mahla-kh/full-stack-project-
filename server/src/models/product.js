import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
      trim: true,
    },
    desc: {
      type: String,
    },
    price: {
      type: Number,
    },
    pictures: [{ buffer: { type: Buffer } }],
  },
  { timestamps: true }
);

const Product = new mongoose.model("Product", productSchema);
export default Product;
