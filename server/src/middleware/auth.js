import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });
    if (!user) throw new Error("token prob");
    req.user = user;
    req.token = token;
    next();
  } catch (err) {
    console.log(err);
    res.status(400).send("please Authenticate");
  }
};
