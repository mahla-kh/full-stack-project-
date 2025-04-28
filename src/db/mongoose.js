import mongoose from "mongoose";
const uri =
  process.env.NODE_ENV === "test"
    ? "mongodb://127.0.0.1:27017/task-manager-test"
    : "mongodb://127.0.0.1:27017/task-manager-mongoose";
mongoose.connect(uri);
