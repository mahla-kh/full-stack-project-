import express from "express";
import "./db/mongoose.js";
import { router as userRouter } from "./routers/user.js";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
export const app = express();
app.use(cors());
app.use(express.json());
app.use(userRouter);
