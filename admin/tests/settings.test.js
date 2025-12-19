import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import { createMocks } from "node-mocks-http";

jest.mock("@/pages/api/auth/[...nextauth]", () => ({
  isAdminRequest: jest.fn(() => Promise.resolve(true)),
}));

import handle from "@/pages/api/settings";
import { Setting } from "@/models/Setting";

let mongo;

beforeAll(async () => {
  mongo = await MongoMemoryServer.create();
  const uri = mongo.getUri();
  process.env.MONGODB_URI = uri;
  await mongoose.connect(uri);
});

afterAll(async () => {
  await mongoose.connection.close();
  await mongo.stop();
});

test("PUT /api/settings creates a new setting", async () => {
  const { req, res } = createMocks({
    method: "PUT",
    body: { name: "shippingFee", value: "10" },
  });

  await handle(req, res);

  expect(res._getStatusCode()).toBe(200);
  const data = JSON.parse(res._getData());
  expect(data.name).toBe("shippingFee");
  expect(data.value).toBe("10");
});

test("GET /api/settings returns an existing setting", async () => {
  await Setting.create({ name: "taxRate", value: "18" });

  const { req, res } = createMocks({
    method: "GET",
    query: { name: "taxRate" },
  });

  await handle(req, res);

  expect(res._getStatusCode()).toBe(200);
  const data = JSON.parse(res._getData());
  expect(data.name).toBe("taxRate");
  expect(data.value).toBe("18");
});
