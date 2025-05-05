import express from "express";
import "./db/mongoose.js";
import dotenv from "dotenv";
import { router as userRouter } from "./routers/user.js";
import { router as productRouter } from "./routers/product.js";
import { router as likeRouter } from "./routers/like.js";
import cors from "cors";

dotenv.config();
export const app = express();
app.use(cors());
app.use(express.json());
app.use(userRouter);
app.use(productRouter);
app.use(likeRouter);
