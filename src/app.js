import express from "express";
import "./db/mongoose.js";
import { router as userRouter } from "./routers/user.js";
import { router as taskRouter } from "./routers/task.js";
import dotenv from "dotenv";
dotenv.config();
export const app = express();

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);
