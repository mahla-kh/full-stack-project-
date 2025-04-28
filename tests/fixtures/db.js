import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { User } from "../../src/models/user";
import { Task } from "../../src/models/task";

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
export const userTwoId = new mongoose.Types.ObjectId();
export const userTwo = {
  _id: userTwoId,
  name: "Mahan",
  email: "Mahan@gmail.com",
  password: "Mahan1234",
  tokens: [
    {
      token: jwt.sign({ _id: userTwoId }, process.env.JWT_SECRET),
    },
  ],
};

export const taskOne = {
  _id: new mongoose.Types.ObjectId(),
  title: "fly to the moon",
  desc: "tomorrow :)",
  isCompleted: false,
  owner: userOneId,
};
export const taskTwo = {
  _id: new mongoose.Types.ObjectId(),
  title: "fly to the sun",
  desc: "burn :)",
  isCompleted: true,
  owner: userTwoId,
};

export const resetDatabase = async () => {
  await User.deleteMany({});
  await Task.deleteMany({});
  await new User(userOne).save();
  await new User(userTwo).save();
  await new Task(taskOne).save();
  await new Task(taskTwo).save();
};
