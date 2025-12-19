import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import { createMocks } from "node-mocks-http";
import handle from "@/pages/api/products";
import { Product } from "@/models/Product";

jest.mock("@/lib/mongodb", () => ({
  clientPromise: Promise.resolve({}),
}));

jest.mock("@/pages/api/auth/[...nextauth]", () => ({
  authOptions: {},
  isAdminRequest: jest.fn(() => Promise.resolve(true)),
}));

let mongo;

beforeAll(async () => {
  mongo = await MongoMemoryServer.create();
  const uri = mongo.getUri();
  await mongoose.connect(uri, { dbName: "testdb" });
});

afterEach(async () => {
  await Product.deleteMany({});
});

afterAll(async () => {
  await mongoose.connection.close();
  await mongo.stop();
});

test("GET /api/products returns empty array", async () => {
  const { req, res } = createMocks({ method: "GET" });

  await handle(req, res);

  expect(res._getStatusCode()).toBe(200);
  expect(JSON.parse(res._getData())).toEqual([]);
});

test("POST /api/products creates a product", async () => {
  const { req, res } = createMocks({
    method: "POST",
    body: {
      title: "Test",
      description: "123",
      price: 100,
    },
  });

  await handle(req, res);

  expect(res._getStatusCode()).toBe(200);

  const json = JSON.parse(res._getData());
  expect(json.title).toBe("Test");

  const saved = await Product.findOne({ title: "Test" });
  expect(saved).not.toBeNull();
});
