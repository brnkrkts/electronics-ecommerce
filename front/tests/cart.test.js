import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import { createMocks } from "node-mocks-http";
import handle from "../pages/api/cart";

let mongo;

beforeAll(async () => {
  mongo = await MongoMemoryServer.create();
  const uri = mongo.getUri();
  await mongoose.connect(uri);
});

afterAll(async () => {
  await mongoose.connection.close();
  await mongo.stop();
});

test("returns empty array when no ids provided", async () => {
  const { req, res } = createMocks({
    method: "POST",
    body: {},
  });

  await handle(req, res);
  const data = JSON.parse(res._getData());

  expect(Array.isArray(data)).toBe(true);
  expect(data.length).toBe(0);
});

test("returns empty array when ids is not an array", async () => {
  const { req, res } = createMocks({
    method: "POST",
    body: { ids: "not-an-array" },
  });

  await handle(req, res);
  const data = JSON.parse(res._getData());

  expect(Array.isArray(data)).toBe(true);
  expect(data.length).toBe(0);
});
