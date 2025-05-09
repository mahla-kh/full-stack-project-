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
    category: {
      type: String,
    },
    price: {
      type: Number,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      require: true,
      default: null,
    },
    pictures: [{ buffer: { type: Buffer } }],
  },
  { timestamps: true }
);

const Product = new mongoose.model("Product", productSchema);
export default Product;
