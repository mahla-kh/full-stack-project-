import request from "supertest";
import { app } from "../src/app.js";
import {
  resetDatabase,
  taskOne,
  userOne,
  userOneId,
  userTwo,
} from "./fixtures/db.js";
import { User } from "../src/models/user.js";
import dotenv from "dotenv";
import { Task } from "../src/models/task.js";
dotenv.config();
// console.log(userOne);

beforeEach(resetDatabase);

test("add task ", async () => {
  const respond = await request(app)
    .post("/tasks")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send({ title: "end today", desc: "got a lot to do" })
    .expect(201);

  const task = Task.findById(respond.body._id);
  expect(task).not.toBeNull();
});

test("get auth tasks", async () => {
  const respond = await request(app)
    .get("/tasks")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
  expect(respond.body.length).toEqual(1);
});

test("user2 shouldent delete user1 task", async () => {
  await request(app)
    .delete(`/tasks/:${taskOne._id}`)
    .set("Authorization", `Bearer ${userTwo.tokens[0].token}`)
    .send()
    .expect(404);
});
