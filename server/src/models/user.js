import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      // validate(value) { isEmail(value)},
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minLength: 8,
    },
    phoneNumber: {
      type: String,
      required: true,
      trim: true,
    },
    tokens: [{ token: { type: String, required: true } }],
    liked: [
      { productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" } },
    ],
    saved: [{ productId: { type: mongoose.Types.ObjectId, ref: "Product" } }],
    avatar: {
      type: Buffer,
    },
  },
  { timestamps: true }
);

userSchema.virtual("products", {
  ref: "Product",
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

userSchema.methods.generateToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET);
  user.tokens = user.tokens.concat({ token });
  console.log(user);
  await user.save();
  return token;
};

userSchema.statics.findByInfo = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("user not found");
  const isMatch = bcrypt.compare(user.password, password);
  if (!isMatch) throw new Error("password dosent match");
  return user;
};

userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = bcrypt.hash(user.password, 8);
  }
  next();
});

const User = mongoose.model("User", userSchema);
export default User;
