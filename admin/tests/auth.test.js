import { createMocks } from "node-mocks-http";


jest.mock("@auth/mongodb-adapter", () => ({
  MongoDBAdapter: jest.fn(),
}), { virtual: true });


jest.mock("next-auth", () => ({
  __esModule: true,
  default: () => ({}),        
  getServerSession: jest.fn(),
}));

jest.mock("next-auth/providers/google", () => () => ({}));

jest.mock("@/lib/mongodb", () => ({
  __esModule: true,
  default: Promise.resolve({}), 
}));


jest.mock("@/models/Admin", () => ({
  Admin: {
    findOne: jest.fn(),
  },
}));

const { getServerSession } = require("next-auth");
const { Admin } = require("@/models/Admin");
const { isAdminRequest } = require("@/pages/api/auth/[...nextauth]");

describe("isAdminRequest", () => {
  test("admin olmayan kullanıcıya 401 döner ve 'not an admin' fırlatır", async () => {
    const { req, res } = createMocks();

    getServerSession.mockResolvedValueOnce({
      user: { email: "user@example.com" },
    });

    Admin.findOne.mockResolvedValueOnce(null);

    await expect(isAdminRequest(req, res)).rejects.toEqual("not an admin");
    expect(res._getStatusCode()).toBe(401);
  });

  test("admin kullanıcıya izin verir (throw etmez)", async () => {
    const { req, res } = createMocks();

    getServerSession.mockResolvedValueOnce({
      user: { email: "admin@example.com" },
    });

    Admin.findOne.mockResolvedValueOnce({
      _id: "123",
      email: "admin@example.com",
    });

    await expect(isAdminRequest(req, res)).resolves.toBeUndefined();
  });
});
