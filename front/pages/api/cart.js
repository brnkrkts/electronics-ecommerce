import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";

export default async function handle(req, res) {
  await mongooseConnect();
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  const { ids } = req.body || {};
  if (!ids || !Array.isArray(ids)) {
    return res.json([]);
  }
  const products = await Product.find({ _id: ids });
  res.json(products);
}
