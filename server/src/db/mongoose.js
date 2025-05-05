import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const uri =
  process.env.NODE_ENV === "test"
    ? process.env.MONGODB_URI_TEST
    : process.env.MONGODB_URI;
// const uri =
//   process.env.NODE_ENV === "test"
//     ? "mongodb://127.0.0.1:27017/sewing-project-test"
//     : "mongodb://127.0.0.1:27017/sewing-project-mongoose";
mongoose.connect(uri);
