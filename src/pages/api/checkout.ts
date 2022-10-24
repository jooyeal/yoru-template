import { NextApiRequest, NextApiResponse } from "next";
import { OutputGetCart } from "../../schema/cart.schema";

const stripe = require("stripe")(process.env.NEXT_PUBLIC_STRIPE_PRIVATE_KEY);

async function CreateStripeSession(req: NextApiRequest, res: NextApiResponse) {
  const {
    cartData,
    userEmail,
  }: { cartData: OutputGetCart; userEmail: string } = req.body;
  const transformedItem = cartData.products?.map((product) => ({
    price_data: {
      currency: "jpy",
      unit_amount: product.price / product.quantity,
      product_data: {
        name: product.title,
      },
    },
    quantity: product.quantity,
  }));
  const redirectURL = process.env.NEXT_PUBLIC_HOST_URL;

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    customer_email: userEmail,
    line_items: transformedItem,
    metadata: {
      ids: cartData.products?.reduce(
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
