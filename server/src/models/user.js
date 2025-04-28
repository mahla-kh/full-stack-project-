import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import bycript from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
      trim: true,
    },
    email: {
      type: String,
      require: true,
      trim: true,
      unique: true,
      // validate(value) { isEmail(value)},
    },
    password: {
      type: String,
      require: true,
      trim: true,
      minLength: 8,
    },
    tokens: [{ token: { type: String, require: true } }],
    avatar: {
      type: Buffer,
    },
  },
  { timestamps: true }
);

userSchema.methods.toJSON = async function () {
  const user = this;
  const userObj = user.toObject();
  delete userObj.password;
  delete userObj.tokens;
  return userObj;
};

userSchema.methods.generateToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET);
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};

userSchema.statics.findByInfo = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("user not found");
  const isMatch = bycript.compare(user.password, password);
  if (!isMatch) throw new Error("password dosent match");
  return user;
};

userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = bycript.hash(user.password, 8);
  }
  next();
});

const User = mongoose.model("User", userSchema);
export default User;
