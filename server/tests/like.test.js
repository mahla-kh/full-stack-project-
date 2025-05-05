import request from "supertest";
import { resetDatabase, userOne } from "./fixtures/db";
import { app } from "../../src/app";

beforeEach(resetDatabase);

test("get user likes", async () => {
  const res = await request(app)
    .get("/userlikes")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);

  //   expect(res.body.length).toEqual(2);
});

test("get all likes", async () => {
  const res = await request(app).get("alllikes").send().expect(200);
  //   expect(res.body.length).toEqual(3);
});

test("add new like", async () => {
  const res = await request(app)
    .post("addlike")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send(firstLike)
    .expect(200);
});
