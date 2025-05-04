import mongoose from "mongoose";

const librarySchema = new mongoose.Schema(
  {
    userId: mongoose.Schema.Types.ObjectId,
    productId: mongoose.Schema.Types.ObjectId,
  },
  { timestamps: true }
);

const Library = new mongoose.model("Library", librarySchema);
export default Library;
