import mongoose from "mongoose";

const uri =
  process.env.NODE_ENV === "test"
    ? "mongodb://127.0.0.1:27017/sewing-project-test"
    : "mongodb://127.0.0.1:27017/sewing-project-mongoose";
mongoose.connect(uri);
