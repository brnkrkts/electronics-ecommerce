import { mongooseConnect } from "@/lib/mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
import { Order } from "@/models/Order";

export default async function handle(req, res) {
  await mongooseConnect();

  const session = await getServerSession(req, res, authOptions);

  if (!session || !session.user || !session.user.email) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  const userEmail = session.user.email;

  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  res.json(await Order.find({ userEmail }));
}
