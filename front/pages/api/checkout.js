import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { Order } from "@/models/Order";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { Settings } from "@/models/Settings";
const stripe = require("stripe")(process.env.STRIPE_SK);
const baseUrl = process.env.NEXT_PUBLIC_URL;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const {
    name,
    email,
    city,
    postalCode,
    streetAddress,
    country,
    fullAddress,
    cartProducts,
  } = req.body;
  await mongooseConnect();

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  if (
    !cartProducts ||
    !Array.isArray(cartProducts) ||
    cartProducts.length === 0
  ) {
    return res.status(400).json({ error: "Cart is empty" });
  }

  const productsIds = cartProducts;
  const uniqueIds = [...new Set(productsIds)];
  const productsInfos = await Product.find({ _id: uniqueIds });
  if (uniqueIds.length === 0) {
    return res.status(400).json({ error: "Invalid cart data" });
  }
  if (productsInfos.length === 0) {
    return res.status(400).json({ error: "Product not found" });
  }
  let line_items = [];
  for (const productId of uniqueIds) {
    const productInfo = productsInfos.find(
      (p) => p._id.toString() === productId
    );
    const quantity = productsIds.filter((id) => id === productId)?.length || 0;
    if (quantity > 0 && productInfo) {
      line_items.push({
        quantity,
        price_data: {
          currency: "USD",
          product_data: {
            name: productInfo.title,
          },
          unit_amount: productInfo.price * 100,
        },
      });
    }
  }
  const session = await getServerSession(req, res, authOptions);

  const orderDoc = await Order.create({
    line_items,
    name,
    email,
    city,
    postalCode,
    streetAddress,
    country,
    fullAddress,
    paid: false,
    userEmail: session?.user?.email,
  });

  const shippingFeeSettings = await Settings.findOne({ name: "shippingFee" });
  const shippingFeeValue = shippingFeeSettings?.value;
  const shippingFeeCents =
    parseInt(shippingFeeValue ? shippingFeeValue : "0") * 100;

  const stripeSession = await stripe.checkout.sessions.create({
    line_items,
    mode: "payment",
    customer_email: email,
    success_url: `${baseUrl}/cart?success=1`,
    cancel_url: `${baseUrl}/cart?canceled=1`,
    metadata: { orderId: orderDoc._id.toString() },
    allow_promotion_codes: true,
    shipping_options: [
      {
        shipping_rate_data: {
          display_name: "shipping fee",
          type: "fixed_amount",
          fixed_amount: { amount: shippingFeeCents, currency: "USD" },
        },
      },
    ],
  });

  res.json({
    url: stripeSession.url,
  });
}
