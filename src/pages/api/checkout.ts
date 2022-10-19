import { NextApiRequest, NextApiResponse } from "next";

const stripe = require("stripe")(process.env.NEXT_PUBLIC_STRIPE_PRIVATE_KEY);

async function CreateStripeSession(req: NextApiRequest, res: NextApiResponse) {
  const { order } = req.body;
  const transformedItem = order.cartData.map((product: any) => ({
    price_data: {
      currency: "jpy",
      unit_amount: product.price / product.quantity,
      product_data: {
        name: product.title,
      },
    },
    quantity: product.quantity,
  }));
  const redirectURL = "http://localhost:3000";

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    customer_email: order.userEmail,
    line_items: transformedItem,
    metadata: {
      ids: order.cartData.reduce(
        (prev: any, curr: any) => prev + "," + curr.id,
        ""
      ),
    },
    mode: "payment",
    success_url:
      redirectURL + "/checkout/success?session_id={CHECKOUT_SESSION_ID}",
    cancel_url: redirectURL + "/checkout/cancel",
  });

  res.json({ id: session.id });
}

export default CreateStripeSession;
