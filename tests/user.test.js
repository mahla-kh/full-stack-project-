import request from "supertest";
import { app } from "../src/app.js";
import { resetDatabase, userOne, userOneId } from "./fixtures/db.js";
import { User } from "../src/models/user.js";
import dotenv from "dotenv";
dotenv.config();
console.log(userOne);

beforeEach(resetDatabase);
test("should sign up users", async () => {
  const respond = await request(app)
    .post("/users")
    .send({
      name: "shiva",
      email: "shiva@gmail.com",
      password: "shiva1112",
    })
    .expect(200);
  const user = await User.findOne({ name: "shiva" });
  expect(respond.body.token).toBe(user.tokens[0].token);
});

test("should login user", async () => {
  console.log("user one :", userOne);
  const respond = await request(app)
    .post("/users/login")
    .send({
      email: userOne.email,
      password: userOne.password,
    })
    .expect(200);

  const user = await User.findById(userOneId);
  expect(respond.body.token).toBe(user.tokens[1].token);
});
test("should not login nonexistant user", async () => {
  await request(app)
    .post("/users/login")
    .send({
      email: "test@example.com",
      password: "12345678",
    })
    .expect(401);
});

test("should get user profile", async () => {
  const respond = await request(app)
    .get("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .expect(200);
});

test("should delete user profile", async () => {
  await request(app)
    .delete("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
  const user = await User.findById(userOneId);
  expect(user).toBeNull();
});
test("should not delete unauthenticated user", async () => {
  await request(app).delete("/users/me").send().expect(401);
});

test("should update valid user fields", async () => {
  await request(app)
    .patch("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send({ name: "mahla" })
    .expect(200);

  const user = await User.findById(userOneId);
  expect(user.name).toEqual("mahla");
});

test("should not update invalid fields", async () => {
  await request(app)
    .patch("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send({ location: "iran" })
    .expect(400);
});
