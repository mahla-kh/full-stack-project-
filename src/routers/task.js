import express from "express";
import { Task } from "../models/task.js";
import { auth } from "../middleware/auth.js";
export const router = express.Router();

router.post("/tasks", auth, async (req, res) => {
  try {
    const task = new Task({ ...req.body, owner: req.user._id });
    await task.save();
    res.status(201).send(task);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.get("/tasks", auth, async (req, res) => {
  const match = {};
  const sort = {};
  if (req.query.completed) match.completed = req.query.completed === "true";
  // tasks?sortby=createdAt_desc
  if (req.query.sortby) {
    const splited = req.query.sortby.split("_");
    sort[splited[0]] = splited[1] === "desc" ? -1 : 1;
  }
  try {
    // const result = await Task.find({ owner: req.user._id });
    await req.user.populate({
      path: "tasks",
      match,
      options: {
        limit: parseInt(req.query.limit),
        skip: parseInt(req.query.skip),
      },
      sort,
    });

    res.send(req.user.tasks);
  } catch (err) {
    // console.log(err);
    res.send(err);
  }
});

router.get("/tasks/:id", auth, async (req, res) => {
  try {
    const _id = req.params.id;
    const task = await Task.findOne({ _id, owner: req.user._id });
    if (!task) return res.status(404).send();
    res.send(task);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.patch("/tasks/:id", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["title", "desc", "isCompleted"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );
  if (!isValidOperation) throw new Error("update invalid");
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });
    if (!task) throw new Error("task not found");
    updates.forEach((update) => (task[update] = req.body[update]));

    await task.save();
    res.send(task);
  } catch (err) {
    // console.log(err);
    res.status(404).send(err);
  }
});

router.delete("/tasks/:id", auth, async (req, res) => {
  try {
    const task = Task.findOneAndDelete({ _id, owner: req.user._id });
    if (!task) throw new Error();
    res.send(task);
  } catch (err) {
    res.status(404).send(err);
  }
});
