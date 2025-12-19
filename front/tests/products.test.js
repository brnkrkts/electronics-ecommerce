import { connectToTestDB, closeTestDB, clearDB } from "./test-utils";
import handler from "../pages/api/products";
import httpMocks from "node-mocks-http";
import { Product } from "../models/Product";
import mongoose from "mongoose";

describe("GET /api/products", () => {
  beforeAll(async () => {
    await connectToTestDB();
  });

  afterAll(async () => {
    await closeTestDB();
  });

  beforeEach(async () => {
    await clearDB();
  });

  test("should return all products", async () => {
    await Product.create([
      { title: "Product A", price: 100, description: "Test", category: new mongoose.Types.ObjectId() },
      { title: "Product B", price: 200, description: "Test", category: new mongoose.Types.ObjectId() }
    ]);

    const req = httpMocks.createRequest({
      method: "GET"
    });
    const res = httpMocks.createResponse();

    await handler(req, res);

    expect(res.statusCode).toBe(200);

    const data = res._getJSONData();
    expect(Array.isArray(data)).toBe(true);
    expect(data.length).toBe(2);

    const titles = data.map((p) => p.title);
    expect(titles).toContain("Product A");
    expect(titles).toContain("Product B");
  });
});
