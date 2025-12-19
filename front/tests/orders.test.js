
jest.mock("@/pages/api/auth/[...nextauth]", () => ({
  authOptions: {},
}));

jest.mock("@/lib/mongodb", () => ({
  clientPromise: Promise.resolve({}),
}));

import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import { createMocks } from "node-mocks-http";
import handle from "../pages/api/orders";

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

test("returns 401 if user is not authenticated", async () => {
  const { req, res } = createMocks({
    method: "GET",
  });

  await handle(req, res);

  expect(res._getStatusCode()).toBe(401);

  const data = JSON.parse(res._getData());
  expect(data.error).toBe("Not authenticated");
});
