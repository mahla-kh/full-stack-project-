import mongoose from "mongoose";

const likeSchema = new mongoose.Schema(
  {
    userId: mongoose.Schema.Types.ObjectId,
    productId: mongoose.Schema.Types.ObjectId,
  },
  { timestamps: true }
);

const Like = new mongoose.model("Like", likeSchema);
export default Like;
