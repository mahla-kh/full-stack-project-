import mongoose from "mongoose";
import validator from "validator";
// import isEmail from "validator/lib/isEmail.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { Task } from "./task.js";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
      trim: true,
      validate(value) {
        if (!value) throw new Error("invalid name");
      },
    },
    email: {
      type: String,
      unique: true,
      require: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) throw new Error("invalid email address");
      },
    },
    password: {
      type: String,
      require: true,
      minLength: 8,
      trim: true,
    },
    age: {
      type: Number,
      default: 0,
      validate(value) {
        if (value < 0) {
          throw new Error("age invalid");
        }
      },
    },
    tokens: [
      {
        token: {
          type: String,
          require: true,
        },
      },
    ],
    avatar: {
      type: Buffer,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.virtual("tasks", {
  ref: "Task",
  localField: "_id",
  foreignField: "owner",
});

userSchema.methods.toJSON = function () {
  const user = this;
  const userObj = user.toObject();
  delete userObj.password;
  delete userObj.tokens;

  return userObj;
};

userSchema.methods.generateAuthTokens = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET);
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};

userSchema.statics.findByInfo = async (email, password) => {
  console.log(email, password);
  const user = await User.findOne({ email });
  // if (!user) return console.log("user not found");
  if (!user) throw new Error("user not found");
  console.log(password, user.password);
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("user is not ok");
  return user;
};

userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

userSchema.pre("remove", async function (next) {
  const user = this;
  await Task.deleteMany({ owner: user._id });
  next();
});

export const User = mongoose.model("User", userSchema);
