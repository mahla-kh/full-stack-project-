import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import User from "../../src/models/user";
import Product from "../../src/models/product";

export const userOneId = new mongoose.Types.ObjectId();
export const userOne = {
  _id: userOneId,
  name: "Amin",
  email: "amin@gmail.com",
  password: "amin1234",
  tokens: [
    {
      token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET),
    },
  ],
};

export const resetDatabase = async () => {
  await User.deleteMany({});
  await Product.deleteMany({});
  await new User(userOne).save();
  //   await new User(userTwo).save();
  //   await new Task(taskOne).save();
  //   await new Task(taskTwo).save();
};
